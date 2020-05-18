import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Appointment } from '../model/appointment.model';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Appointment,
                schemaOptions: { timestamps: true },
            },
        ]),
        TransactionModule,
    ],
    controllers: [AppointmentController],
    providers: [AppointmentService],
})
export class AppointmentModule {}
