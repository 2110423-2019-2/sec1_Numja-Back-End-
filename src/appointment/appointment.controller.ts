import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { AppointmentDTO } from './appointment.dto';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly service: AppointmentService) {}

    @Post()
    createAppointment(
        @Body() appointment: AppointmentDTO,
        @UserId() studentId: string,
    ) {
        return this.service.createAppointment(appointment, studentId);
    }

    @Get()
    getAllAppointments() {
        return this.service.getAllAppointments();
    }

    @Get('id/:id')
    findById(@Param('id') id: string) {
        return this.service.findById(id);
    }

    @Get()
    findByUserId(@UserId() userId: string) {
        return this.service.findByUserId(userId);
    }

    @Patch()
    cancelAppointment() {}

    @Patch()
    acceptAppointment() {}

    @Patch()
    finishAppointment() {}
}
