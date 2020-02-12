import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SystemReportService } from './system-report.service';
import { SystemReport } from '../model/system-report.model';

@ApiBearerAuth()
@ApiTags('Report')
@Controller('report/system')
export class SystemReportController {
    constructor(private readonly service: SystemReportService) {}

    @Get()
    all() {
        return this.service.find();
    }
    @Get(':id')
    one(@Param('id') reportId: string) {
        return this.service.findById(reportId);
    }
    @Post()
    create(@Body() report: SystemReport) {
        return this.service.create(report);
    }
}
