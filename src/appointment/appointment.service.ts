import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Appointment } from 'src/model/appointment.model';
import { AppointmentStatus } from 'src/enum/appointment.enum';
import { ReturnModelType} from '@typegoose/typegoose';
import { CreateAppointmentDTO, EditAppointmentDTO } from './appointment.dto';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/enum/user.enum';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Appointment)
        private readonly model: ReturnModelType<typeof Appointment>,
        private readonly userService: UserService,
    ) {}

    async createAppointment(
        { tutorId, ...createAppointmentDTO }: CreateAppointmentDTO,
        studentId: string,
    ): Promise<Appointment> {
        const tutor = await this.userService.findById(tutorId);
        if (tutor.role !== UserRole.Tutor)
            throw new NotFoundException('Invalid tutorId');
        const student = await this.userService.findById(studentId);
        const appointmentObject = new this.model({
            ...createAppointmentDTO,
            student,
            tutor,
        });
        return appointmentObject.save();
    }

    find(): Promise<Appointment[]> {
        return this.model.find().exec();
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
        if (appointment.student+"" !== userId)throw new ForbiddenException();
        if (
            (appointment.status === AppointmentStatus.Approved &&
                appointmentDTO.status === AppointmentStatus.Finished) ||
            (appointment.status === AppointmentStatus.Approved &&
                appointmentDTO.status === AppointmentStatus.Cancelled) ||
            (appointment.status === AppointmentStatus.Pending &&
                appointmentDTO.status === AppointmentStatus.Cancelled)
        )
            return this.model
                .findByIdAndUpdate(
                    id,
                    appointmentDTO,
                    {
                        new: true,
                    },
                )
                .exec();
    }

    async updateTutorAppointmentStatus(
        id: string,
        userId: string,
        appointmentDTO: Partial<Appointment>,
    ): Promise<Appointment> {
        const appointment = await this.findById(id);
        if(appointment.tutor+"" !== userId)throw new ForbiddenException();
        if (
            (appointment.status === AppointmentStatus.Pending &&
                appointmentDTO.status === AppointmentStatus.Rejected) ||
            (appointment.status === AppointmentStatus.Pending &&
                appointmentDTO.status === AppointmentStatus.Approved) ||
            (appointment.status === AppointmentStatus.Approved &&
                appointmentDTO.status === AppointmentStatus.Cancelled)
        )
            return this.model
                .findByIdAndUpdate(
                    id,
                    appointmentDTO,
                    {
                        new: true,
                    },
                )
                .exec();
    }

    async updateStudentAppointmentInfo(
        id: string,
        userId: string,
        editAppointmentDTO: Partial<EditAppointmentDTO>,
    ): Promise<Appointment> {
        const appointment = await this.findById(id);
        if(appointment.student+"" !== userId)throw new ForbiddenException();
        if (appointment.status === AppointmentStatus.Pending)
            return this.model
                .findByIdAndUpdate(
                    id,
                    editAppointmentDTO,
                    {
                        new: true,
                    },
                )
                .exec();
    }
}
