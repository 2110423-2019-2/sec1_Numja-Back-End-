import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Report } from '../model/report.model';
import { SystemReportDTO, UserReportDTO } from './report.dto';
import { ReportType } from '../enum/report.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(Report)
        private readonly model: ReturnModelType<typeof Report>,
        private readonly userService: UserService,
    ) {}

    getAllReports(): Promise<Report[]> {
        return this.model.find().exec();
    }

    findById(id: string): Promise<Report> {
        return this.model.findById(id).exec();
    }

    getUserReports(): Promise<Report[]> {
        return this.model.find({ type: ReportType.User }).exec();
    }

    getSystemReports(): Promise<Report[]> {
        return this.model.find({ type: ReportType.System }).exec();
    }

    async createUserReport(
        report: UserReportDTO,
        reporterId: string,
    ): Promise<Report> {
        const reporter = await this.userService.findById(reporterId);
        const reportedUser = await this.userService.findById(
            report.reportedUserId,
        );
        const userReport = new this.model({
            title: report.title,
            description: report.description,
            type: ReportType.User,
            reporter,
            reportedUser,
        });
        return userReport.save();
    }

    async createSystemReport(
        report: SystemReportDTO,
        reporterId,
    ): Promise<Report> {
        const reporter = await this.userService.findById(reporterId);
        const systemReport = new this.model({
            title: report.title,
            description: report.description,
            type: ReportType.System,
            reporter,
        });
        return systemReport.save();
    }
}
