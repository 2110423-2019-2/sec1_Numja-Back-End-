import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { AuthGuard } from '../guards/auth.guard';
import { SystemReportDTO, UserReportDTO } from './report.dto';
import { UserId } from '../decorators/user-id.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../enum/user.enum';
import { ReportType } from '../enum/report.enum';

@ApiBearerAuth()
@ApiTags('Report')
@UseGuards(AuthGuard, RolesGuard)
@Controller('report')
export class ReportController {
    constructor(private readonly service: ReportService) {}

    @Roles(UserRole.Admin)
    @Get()
    find() {
        return this.service.find({});
    }

    @Roles(UserRole.Admin)
    @Get('user')
    findUserReports() {
        return this.service.find({ type: ReportType.User });
    }

    @Roles(UserRole.Admin)
    @Get('system')
    findSystemReports() {
        return this.service.find({ type: ReportType.User });
    }

    @Roles(UserRole.Admin)
    @Get('id/:id')
    findById(@Param('id') id: string) {
        return this.service.findById(id);
    }

    @Roles(UserRole.Student, UserRole.Tutor)
    @Post('user')
    createUserReport(
        @Body() report: UserReportDTO,
        @UserId() reporterId: string,
    ) {
        return this.service.createUserReport(report, reporterId);
    }

    @Roles(UserRole.Student, UserRole.Tutor)
    @Post('system')
    createSystemReport(
        @Body() report: SystemReportDTO,
        @UserId() reporterId: string,
    ) {
        return this.service.createSystemReport(report, reporterId);
    }
}
