import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Appointment } from '../model/appointment.model';
import { AppointmentStatus } from '../enum/appointment.enum';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateAppointmentDTO, EditAppointmentDTO } from './appointment.dto';
import { UserService } from '../user/user.service';
import { UserRole } from '../enum/user.enum';
import { TransactionService } from '../transaction/transaction.service';
import { TransactionType } from '../enum/transaction.enum';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Appointment)
        private readonly model: ReturnModelType<typeof Appointment>,
        private readonly userService: UserService,
        private readonly transactionService: TransactionService,
    ) {}

    async createAppointment(
        { tutorId, ...createAppointmentDTO }: CreateAppointmentDTO,
        studentId: string,
    ): Promise<Appointment> {
        if (createAppointmentDTO.endTime < createAppointmentDTO.startTime) {
            throw new BadRequestException('Invalid start and end time');
        }
        const studentAppointments = await this.findByUserId(studentId);
        const money_owe: number[] = studentAppointments.map(
            (appoinment: Appointment) => {
                if (
                    appoinment.status == AppointmentStatus.Pending ||
                    appoinment.status == AppointmentStatus.Approved
                ) {
                    return 0.7 * appoinment.price;
                } else {
                    return 0;
                }
            },
        );
        const moneyNeededToPay =
            money_owe.reduce(
                (cummulative, next_num) => cummulative + next_num,
                0,
            ) + createAppointmentDTO.price;
        const student = await this.userService.findById(studentId);
        if (student.credit < moneyNeededToPay) {
            throw new BadRequestException('Not Enough Money ');
        }
        const tutor = await this.userService.findById(tutorId);
        if (tutor.role !== UserRole.Tutor)
            throw new NotFoundException('Invalid tutorId');
        const existedAppointment = await this.find({
            startTime: { $lt: createAppointmentDTO.endTime },
            endTime: { $gt: createAppointmentDTO.startTime },
            student,
            status: {
                $in: [AppointmentStatus.Approved, AppointmentStatus.Pending],
            },
        });
        if (existedAppointment.length) {
            throw new BadRequestException('Overlapped appointment');
        }
        await this.transactionService.createTransaction({
            type: TransactionType.Deposit,
            issuerId: studentId + '',
            senderId: studentId + '',
            amount: createAppointmentDTO.price * 0.3,
        });
        const appointmentObject = new this.model({
            ...createAppointmentDTO,
            student,
            tutor,
        });
        return appointmentObject.save();
    }

    find(filter?: Object): Promise<Appointment[]> {
        return this.model.find(filter).exec();
    }

    findById(id: string): Promise<Appointment> {
        return this.model.findById(id).exec();
    }

    async findByUserId(userId: string): Promise<Appointment[]> {
        const user = await this.userService.findById(userId);
        if (user.role === UserRole.Student)
            return this.model.find({ student: user });
        else return this.model.find({ tutor: user }).exec();
    }

    async studentFinishAppointment(
        id: string,
        userId: string,
        appointmentDTO: Partial<Appointment>,
    ): Promise<Appointment> {
        const appointment = await this.findById(id);
        if (appointment.student + '' !== userId) throw new ForbiddenException();
        if (
            appointment.status === AppointmentStatus.Approved &&
            appointmentDTO.status === AppointmentStatus.Finished
        ) {
            await this.transactionService.createTransaction({
                type: TransactionType.FinishAppointment,
                issuerId: appointment.student + '',
                senderId: appointment.student + '',
                amount: 0.7 * appointment.price,
            });
            await this.transactionService.createTransaction({
                type: TransactionType.FinishAppointment,
                issuerId: appointment.student + '',
                receiverId: appointment.tutor + '',
                amount: appointment.price,
            });
        } else
            throw new BadRequestException(
                'Incorrect appointment status change',
            );
        return this.model
            .findByIdAndUpdate(id, appointmentDTO, {
                new: true,
            })
            .exec();
    }

    async studentCancelAppointment(
        id: string,
        userId: string,
        appointmentDTO: Partial<Appointment>,
    ): Promise<Appointment> {
        const appointment = await this.findById(id);
        const MILLISECONDS_TO_DAY = 1000 * 60 * 60 * 24;
        if (appointment.student + '' !== userId) throw new ForbiddenException();
        if (
            (appointment.status === AppointmentStatus.Approved &&
                appointmentDTO.status === AppointmentStatus.Cancelled) ||
            (appointment.status === AppointmentStatus.Pending &&
                appointmentDTO.status === AppointmentStatus.Cancelled)
        ) {
            if (
                appointment.status === AppointmentStatus.Approved &&
                appointmentDTO.status === AppointmentStatus.Cancelled &&
                appointment.startTime.getTime() - new Date().getTime() <
                    3 * MILLISECONDS_TO_DAY
            ) {
                await this.transactionService.createTransaction({
                    type: TransactionType.Deposit,
                    issuerId: appointment.student + '',
                    receiverId: appointment.tutor + '',
                    amount: 0.3 * appointment.price,
                });
            } else {
                await this.transactionService.createTransaction({
                    type: TransactionType.Refund,
                    issuerId: appointment.student + '',
                    receiverId: appointment.student + '',
                    amount: 0.3 * appointment.price,
                });
            }
            return this.model
                .findByIdAndUpdate(id, appointmentDTO, {
                    new: true,
                })
                .exec();
        } else
            throw new BadRequestException(
                'Incorrect appointment status change',
            );
    }

    async tutorCancelAppointment(
        id: string,
        userId: string,
        appointmentDTO: Partial<Appointment>,
    ): Promise<Appointment> {
        const appointment = await this.findById(id);
        if (appointment.tutor + '' !== userId) throw new ForbiddenException();
        if (
            (appointment.status === AppointmentStatus.Pending &&
                appointmentDTO.status === AppointmentStatus.Rejected) ||
            (appointment.status === AppointmentStatus.Approved &&
                appointmentDTO.status === AppointmentStatus.Cancelled)
        ) {
            await this.transactionService.createTransaction({
                type: TransactionType.Refund,
                issuerId: appointment.tutor + '',
                receiverId: appointment.student + '',
                amount: 0.3 * appointment.price,
            });
        } else
            throw new BadRequestException(
                'Incorrect appointment status change',
            );
        return this.model
            .findByIdAndUpdate(id, appointmentDTO, {
                new: true,
            })
            .exec();
    }

    async tutorAcceptAppointment(
        id: string,
        userId: string,
        appointmentDTO: Partial<Appointment>,
    ): Promise<Appointment> {
        const appointment = await this.findById(id);
        if (appointment.tutor + '' !== userId) throw new ForbiddenException();
        if (
            appointment.status === AppointmentStatus.Pending &&
            appointmentDTO.status === AppointmentStatus.Approved
        ) {
            return this.model
                .findByIdAndUpdate(id, appointmentDTO, {
                    new: true,
                })
                .exec();
        } else
            throw new BadRequestException(
                'Incorrect appointment status change',
            );
    }

    async editAppointmentInformation(
        id: string,
        userId: string,
        editAppointmentDTO: Partial<EditAppointmentDTO>,
    ): Promise<Appointment> {
        const appointment = await this.findById(id);
        if (appointment.student + '' !== userId) throw new ForbiddenException();
        if (appointment.status === AppointmentStatus.Pending)
            return this.model
                .findByIdAndUpdate(id, editAppointmentDTO, {
                    new: true,
                })
                .exec();
        else throw new BadRequestException('Appointment is not pending status');
    }
}
