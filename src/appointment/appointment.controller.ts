import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { AppointmentDTO } from './appointment.dto';
import { AppointmentStatus } from 'src/enum/appointment.enum';

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

    @Patch('id/:id')
    cancelAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateStudentAppointment(id, userId, {
            status: AppointmentStatus.Cancelled,
        });
    }

    @Patch('id/:id')
    editAppintment(
        @Param('id') id: string,
        @Body() editObject: Partial<AppointmentDTO>,
        @UserId() userId: string,
    ) {
        return this.service.updateStudentAppointment(id, userId, editObject);
    }

    @Patch('id/:id')
    acceptAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateTutorAppointment(id, userId, {
            status: AppointmentStatus.Approved,
        });
    }

    @Patch('id/:id')
    rejectAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateTutorAppointment(id, userId, {
            status: AppointmentStatus.Cancelled,
        });
    }

    @Patch('id/:id')
    finalizeAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateStudentAppointment(id, userId, {
            status: AppointmentStatus.Finished,
        });
    }
}
