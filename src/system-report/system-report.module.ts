import { Module } from '@nestjs/common';
import { SystemReportController } from './system-report.controller';
import { SystemReportService } from './system-report.service';
import { SystemReport } from '../model/system-report.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: SystemReport,
                schemaOptions: { timestamps: true },
            },
        ]),
        UserModule,
    ],
    controllers: [SystemReportController],
    providers: [SystemReportService],
    exports: [SystemReportService],
})
export class SystemReportModule {}
