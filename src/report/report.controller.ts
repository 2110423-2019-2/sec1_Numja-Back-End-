import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { AuthGuard } from '../guards/auth.guard';
import { SystemReportDTO, UserReportDTO } from './report.dto';

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

    @Get(':id')
    findById(@Param('id') reportId: string) {
        return this.service.findById(reportId);
    }

    @Post('user')
    createUserReport(@Body() report: UserReportDTO) {
        return this.service.createUserReport(report);
    }

    @Post('system')
    createSystemReport(@Body() report: SystemReportDTO) {
        return this.service.createSystemReport(report);
    }
}
