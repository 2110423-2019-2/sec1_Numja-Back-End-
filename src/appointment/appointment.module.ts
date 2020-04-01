import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Appointment } from 'src/model/appointment.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Appointment,
                schemaOptions: { timestamps: true },
            },
        ]),
    ],
    controllers: [AppointmentController],
    providers: [AppointmentService],
})
export class AppointmentModule {}
