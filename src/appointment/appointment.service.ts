import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Appointment } from 'src/model/appointment.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AppointmentDTO } from './appointment.dto';
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
            endtime: appointment.endTime,
            location: appointment.location,
            price: appointment.price,
            student,
            tutor,
        });
        return appointmentObject.save();
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

    async updateStudentAppointment(
        id: string,
        userId: string,
        appointmentDTO: Partial<Appointment>,
    ): Promise<Appointment> {
        return this.model
            .findOneAndUpdate({ id, student: { id: userId } }, appointmentDTO, {
                new: true,
            })
            .exec();
    }

    async updateTutorAppointment(
        id: string,
        userId: string,
        appointmentDTO: Partial<Appointment>,
    ): Promise<Appointment> {
        return this.model
            .findOneAndUpdate({ id, tutor: { id: userId } }, appointmentDTO, {
                new: true,
            })
            .exec();
    }
}
