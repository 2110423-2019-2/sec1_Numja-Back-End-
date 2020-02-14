import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Report } from '../model/report.model';
import { SystemReportDTO, UserReportDTO } from './report.dto';
import { ReportType } from '../enum/report.enum';
import { UserService } from '../user/user.service';
import { User } from '../model/user.model';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(Report)
        private readonly model: ReturnModelType<typeof Report>,
        private readonly userService: UserService,
    ) {}

    find(): Promise<Report[]> {
        return this.model.find().exec();
    }

    findById(reportId: string): Promise<Report> {
        return this.model.findById(reportId).exec();
    }

    getUserReports(): Promise<Report[]> {
        return this.model.find({ type: ReportType.User }).exec();
    }

    getSystemReports(): Promise<Report[]> {
        return this.model.find({ type: ReportType.System }).exec();
    }

    async createUserReport(userReport: UserReportDTO): Promise<Report> {
        let reporter: User, reportedUser: User;
        await this.userService.findById(userReport.reporter).then(user => {
            reporter = user;
        });
        await this.userService.findById(userReport.reportedUser).then(user => {
            reportedUser = user;
        });
        const report = new this.model({ ...userReport , type: ReportType.User, reporter, reportedUser });
        return report.save();
    }

    async createSystemReport(systemReport: SystemReportDTO): Promise<Report> {
        let reporter: User;
        await this.userService.findById(systemReport.reporter).then(user => {
            reporter = user;
        });
        const report = new this.model({ ...systemReport, type: ReportType.System, reporter });
        return report.save();
    }
}
