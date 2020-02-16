import { ApiProperty } from '@nestjs/swagger';

export class EditAppointmentDTO {
    @ApiProperty()
    startTime: Date;

    @ApiProperty()
    endTime: Date;

    @ApiProperty()
    location: string;

    @ApiProperty()
    price: number;
}

export class CreateAppointmentDTO extends EditAppointmentDTO {
    @ApiProperty()
    tutorId: string;
}
