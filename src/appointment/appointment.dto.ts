import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsNumber, IsPositive } from 'class-validator';
import { ToDate, ToInt } from 'class-sanitizer';

export class EditAppointmentDTO {
    @ApiProperty()
    @IsDate()
    @ToDate()
    startTime: Date;

    @ApiProperty()
    @IsDate()
    @ToDate()
    endTime: Date;

    @ApiProperty()
    @IsString()
    location: string;
}

export class CreateAppointmentDTO extends EditAppointmentDTO {
    @ApiProperty()
    @IsString()
    tutorId: string;

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    @ToInt()
    price: number;
}
