import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { UserReportService } from './user-report.service';
import { UserReport } from '../model/user-report.model';

@ApiBearerAuth()
@ApiTags('Report')
@Controller('report/user')
export class UserReportController {
    constructor(private readonly service: UserReportService) {}

    @Post()
    // @UseGuards(AuthGuard) // Not yet working
    create(@Body() report: UserReport) {
        return this.service.create(report);
    }
}
