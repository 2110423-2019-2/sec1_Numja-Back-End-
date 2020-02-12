import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserReportService } from './user-report.service';
import { UserReport } from '../model/user-report.model';

@ApiBearerAuth()
@ApiTags('Report')
@Controller('report/user')
export class UserReportController {
    constructor(private readonly service: UserReportService) {}

    @Get()
    all() {
        return this.service.find();
    }
    @Get(':id')
    one(@Param('id') reportId: string) {
        return this.service.findById(reportId);
    }
    @Post()
    create(@Body() report: UserReport) {
        return this.service.create(report);
    }
}
