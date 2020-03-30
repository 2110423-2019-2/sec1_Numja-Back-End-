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
import { CreateAppointmentDTO, EditAppointmentDTO } from './appointment.dto';
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
    create(
        @Body() createAppointmentDTO: CreateAppointmentDTO,
        @UserId() studentId: string,
    ) {
        return this.service.createAppointment(createAppointmentDTO, studentId);
    }

    @Get()
    find() {
        return this.service.find();
    }

    @Get('id/:id')
    findByAppointmentId(@Param('id') id: string) {
        return this.service.findById(id);
    }

    @Get('me')
    findByUserId(@UserId() userId: string) {
        return this.service.findByUserId(userId);
    }

    @Patch(':id/student/cancel')
    cancelStudentAppointment(
        @Param('id') id: string,
        @UserId() userId: string,
    ) {
        return this.service.updateStudentAppointmentStatus(id, userId, {
            status: AppointmentStatus.Cancelled,
        });
    }

    @Patch(':id/tutor/cancel')
    cancelTutorAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateTutorAppointmentStatus(id, userId, {
            status: AppointmentStatus.Cancelled,
        });
    }

    @Patch(':id/edit')
    editAppointment(
        @Param('id') id: string,
        @Body() editAppointmentDTO: Partial<EditAppointmentDTO>,
        @UserId() userId: string,
    ) {
        return this.service.updateStudentAppointmentInfo(
            id,
            userId,
            editAppointmentDTO,
        );
    }

    @Patch(':id/accept')
    acceptAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateTutorAppointmentStatus(id, userId, {
            status: AppointmentStatus.Approved,
        });
    }

    @Patch(':id/reject')
    rejectAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateTutorAppointmentStatus(id, userId, {
            status: AppointmentStatus.Rejected,
        });
    }

    @Patch(':id/finish')
    finishAppointment(@Param('id') id: string, @UserId() userId: string) {
        return this.service.updateStudentAppointmentStatus(id, userId, {
            status: AppointmentStatus.Finished,
        });
    }
}
