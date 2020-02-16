import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';

export class AppointmentDTO {
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
    @prop({ required: true})
    tutorId: string;
}

export class EditAppointmentDTO{
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
}