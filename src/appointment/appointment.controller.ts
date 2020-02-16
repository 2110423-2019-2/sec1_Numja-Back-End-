import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { AppointmentDTO } from './appointment.dto';
import { AppointmentStatus } from 'src/enum/appointment.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Appointment')
@UseGuards(AuthGuard)
@Controller('appointment')
export class AppointmentController {
    constructor(private readonly service: AppointmentService) {}

    @Post('create')
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
    findByAppointmentId(@Param('id') id: string) {
        return this.service.findById(id);
    }

    @Get('me')
    findByUserId(@UserId() userId: string) {
        return this.service.findByUserId(userId);
    }

    @Patch('cancel/:id')
    cancelAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateStudentAppointment(id, userId, {
            status: AppointmentStatus.Cancelled,
        });
    }

    @Patch('edit/:id')
    editAppintment(
        @Param('id') id: string,
        @Body() editObject: Partial<AppointmentDTO>,
        @UserId() userId: string,
    ) {
        return this.service.updateStudentAppointment(id, userId, editObject);
    }

    @Patch('accept/:id')
    acceptAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateTutorAppointment(id, userId, {
            status: AppointmentStatus.Approved,
        });
    }

    @Patch('reject/:id')
    rejectAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateTutorAppointment(id, userId, {
            status: AppointmentStatus.Cancelled,
        });
    }

    @Patch('finalize/:id')
    finalizeAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateStudentAppointment(id, userId, {
            status: AppointmentStatus.Finished,
        });
    }
}
