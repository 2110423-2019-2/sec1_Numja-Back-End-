import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { AppointmentStatus } from '../enum/appointment.enum';
import { IsDate, IsString, IsNumber } from 'class-validator';

export class Appointment {
    _id: mongoose.Types.ObjectId;

    @IsDate()
    @prop({ required: true })
    startTime: Date;

    @IsDate()
    @prop({ required: true })
    endTime: Date;

    @IsString()
    @prop({ required: true })
    location: string;

    @IsNumber()
    @prop({ required: true })
    price: number;

    @prop({ ref: User })
    student: Ref<User>;

    @prop({ ref: User })
    tutor: Ref<User>;

    @prop({ enum: AppointmentStatus, default: AppointmentStatus.Pending })
    status: AppointmentStatus;
}
