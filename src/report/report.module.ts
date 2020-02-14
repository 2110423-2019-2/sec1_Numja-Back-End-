import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from '../user/user.module';
import { Report } from '../model/report.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Report,
                schemaOptions: { timestamps: true },
            },
        ]),
        UserModule,
    ],
    controllers: [ReportController],
    providers: [ReportService],
    exports: [ReportService],
})
export class ReportModule {}
