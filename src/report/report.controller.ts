import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { AuthGuard } from '../guards/auth.guard';
import { SystemReportDTO, UserReportDTO } from './report.dto';
import { UserId } from '../decorators/user-id.decorator';

@ApiBearerAuth()
@ApiTags('Report')
@UseGuards(AuthGuard)
@Controller('report')
export class ReportController {
    constructor(private readonly service: ReportService) {}

    @Get()
    getAllReports() {
        return this.service.getAllReports();
    }

    @Get('user')
    getUserReports() {
        return this.service.getUserReports();
    }

    @Get('system')
    getSystemReports() {
        return this.service.getSystemReports();
    }

    @Get('id/:id')
    findById(@Param('id') id: string) {
        return this.service.findById(id);
    }

    @Post('user')
    createUserReport(
        @Body() report: UserReportDTO,
        @UserId() reporterId: string,
    ) {
        return this.service.createUserReport(report, reporterId);
    }

    @Post('system')
    createSystemReport(
        @Body() report: SystemReportDTO,
        @UserId() reporterId: string,
    ) {
        return this.service.createSystemReport(report, reporterId);
    }
}
