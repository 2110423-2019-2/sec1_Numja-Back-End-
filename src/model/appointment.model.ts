import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { AppointmentStatus } from 'src/enum/appointment.enum';

export class Appointment {
    _id: mongoose.Types.ObjectId;

    @prop({ required: true })
    startTime: Date;

    @prop({ required: true })
    endTime: Date;

    @prop({ required: true })
    location: string;

    @prop({ required: true })
    price: number;

    @prop({ ref: User })
    student: Ref<User>;

    @prop({ ref: User })
    tutor: Ref<User>;

    @prop({ enum: AppointmentStatus, default: AppointmentStatus.Pending })
    status: AppointmentStatus;
}
