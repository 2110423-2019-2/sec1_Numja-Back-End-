import { Module } from '@nestjs/common';
import { UserReportController } from './user-report.controller';
import { UserReportService } from './user-report.service';
import { UserReport } from '../model/user-report.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from '../user/user.module';
import { SystemReport } from '../model/system-report.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: UserReport,
                schemaOptions: { timestamps: true },
            },
        ]),
        UserModule,
    ],
    controllers: [UserReportController],
    providers: [UserReportService],
    exports: [UserReportService],
})
export class UserReportModule {}
