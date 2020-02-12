import { Module } from '@nestjs/common';
import { SystemReportController } from './system-report.controller';
import { SystemReportService } from './system-report.service';

@Module({
  controllers: [SystemReportController],
  providers: [SystemReportService],
})
export class SystemReportModule {}
