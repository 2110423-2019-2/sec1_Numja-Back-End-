import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { AppointmentStatus } from 'src/enum/appointment.enum';

export class Appointment {
    _id: mongoose.Types.ObjectId;

    get id() {
        return this._id;
    }

    @ApiProperty()
    @prop({ required: true })
    startTime: Date;

    @ApiProperty()
    @prop({ required: true })
    endTime: Date;

    @ApiProperty()
    @prop({ required: true })
    location: string;

    @ApiProperty()
    @prop({ required: true })
    price: number;

    @ApiProperty()
    @prop({ ref: User })
    student: Ref<User>;

    @ApiProperty()
    @prop({ ref: User })
    tutor: Ref<User>;

    @ApiProperty()
    @prop({ enum: AppointmentStatus, default: AppointmentStatus.Pending })
    status: AppointmentStatus;
}
