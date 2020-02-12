import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SystemReportService } from './system-report.service';
import { AuthGuard } from '../guards/auth.guard';
import { SystemReport } from '../model/system-report.model';

@ApiBearerAuth()
@ApiTags('Report')
@Controller('report/system')
export class SystemReportController {
    constructor(private readonly service: SystemReportService) {}

    @Post()
    // @UseGuards(AuthGuard) // Not yet working
    create(@Body() report: SystemReport) {
        return this.service.create(report);
    }
}
