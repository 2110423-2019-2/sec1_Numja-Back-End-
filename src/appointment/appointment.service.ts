import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Appointment } from 'src/model/appointment.model';
import {AppointmentStatus} from 'src/enum/appointment.enum'
import { ReturnModelType } from '@typegoose/typegoose';
import { AppointmentDTO, EditAppointmentDTO } from './appointment.dto';
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
        appointment: AppointmentDTO,
        studentId: string,
    ): Promise<Appointment> {
        const student = await this.userService.findById(studentId);
        const tutor = await this.userService.findById(appointment.tutorId);
        const appointmentObject = new this.model({
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            location: appointment.location,
            price: appointment.price,
            student,
            tutor,
        });
        if(tutor.role===UserRole.Tutor) return appointmentObject.save();
        throw new HttpException('invalid tutor id',HttpStatus.NOT_ACCEPTABLE);
    }

    getAllAppointments(): Promise<Appointment[]> {
        return this.model.find().exec();
    }

    findById(id: string): Promise<Appointment> {
        return this.model.findById(id).exec();
    }

    async findByUserId(userId: string): Promise<Appointment[]> {
        const user = await this.userService.findById(userId);
        const searchObject = {};
        searchObject[user.role] = user;
        return this.model.find(searchObject).exec();
    }

    async updateStudentAppointmentStatus(
        id: string,
        userId: string,
        appointmentDTO: Partial<Appointment>,
    ): Promise<Appointment> {
        const appointment = await this.findById(id);
        if((appointment.status===AppointmentStatus.Approved&&appointmentDTO.status===AppointmentStatus.Finished)||
        (appointment.status===AppointmentStatus.Approved&&appointmentDTO.status===AppointmentStatus.Cancelled)||
        (appointment.status===AppointmentStatus.Pending&&appointmentDTO.status===AppointmentStatus.Cancelled))
        return this.model
            .findOneAndUpdate({ id, student: { id: userId } }, appointmentDTO, {
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
        if(appointment.status===AppointmentStatus.Pending)
        return this.model
            .findOneAndUpdate({ id, tutor: { id: userId } }, appointmentDTO, {
                new: true,
            })
            .exec();
    }

    async updateStudentAppointmentInfo(
        id: string,
        userId: string,
        editAppointmentDTO: Partial<EditAppointmentDTO>,
    ): Promise<Appointment> {
        const appointment = await this.findById(id);
        return this.model
            .findOneAndUpdate({ id, student: { id: userId } }, editAppointmentDTO, {
                new: true,
            })
            .exec();
    }
}
