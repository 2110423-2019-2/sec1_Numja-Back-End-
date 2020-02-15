import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Report } from '../model/report.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Report,
                schemaOptions: { timestamps: true },
            },
        ]),
    ],
    controllers: [ReportController],
    providers: [ReportService],
    exports: [ReportService],
})
export class ReportModule {}
