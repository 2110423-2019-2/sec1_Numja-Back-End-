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
import { TransactionService } from 'src/transaction/transaction.service';
import { TransactionType } from 'src/enum/transaction.enum';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Appointment)
        private readonly model: ReturnModelType<typeof Appointment>,
        private readonly userService: UserService,
        private readonly transactionService: TransactionService
    ) {}

    async createAppointment(
        { tutorId, ...createAppointmentDTO }: CreateAppointmentDTO,
        studentId: string,
    ): Promise<Appointment> {
        if (createAppointmentDTO.endTime < createAppointmentDTO.startTime) {
            throw new BadRequestException('Invalid start and end time');
        }
        const tutor = await this.userService.findById(tutorId);
        if (tutor.role !== UserRole.Tutor)
            throw new NotFoundException('Invalid tutorId');
        const student = await this.userService.findById(studentId);
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

    async updateStudentAppointmentStatus(
        id: string,
        userId: string,
        appointmentDTO: Partial<Appointment>,
    ): Promise<Appointment> {
        const appointment = await this.findById(id);
        if (appointment.student + '' !== userId) throw new ForbiddenException();
        if (
            (appointment.status === AppointmentStatus.Approved &&
                appointmentDTO.status === AppointmentStatus.Finished) ||
            (appointment.status === AppointmentStatus.Approved &&
                appointmentDTO.status === AppointmentStatus.Cancelled) ||
            (appointment.status === AppointmentStatus.Pending &&
                appointmentDTO.status === AppointmentStatus.Cancelled)
        )
            return this.model
                .findByIdAndUpdate(id, appointmentDTO, {
                    new: true,
                })
                .exec();
    }

    async updateTutorAppointmentStatus(
        id: string,
        userId: string,
        appointmentDTO: Partial<Appointment>,
    ): Promise<Appointment> {
        const appointment = await this.findById(id);
        if (appointment.tutor + '' !== userId) throw new ForbiddenException();
        if (
            (appointment.status === AppointmentStatus.Pending &&
                appointmentDTO.status === AppointmentStatus.Rejected) ||
            (appointment.status === AppointmentStatus.Pending &&
                appointmentDTO.status === AppointmentStatus.Approved) ||
            (appointment.status === AppointmentStatus.Approved &&
                appointmentDTO.status === AppointmentStatus.Cancelled)
        )
            return this.model
                .findByIdAndUpdate(id, appointmentDTO, {
                    new: true,
                })
                .exec();
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
    }
}
