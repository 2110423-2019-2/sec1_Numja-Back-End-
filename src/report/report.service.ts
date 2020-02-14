import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Report } from '../model/report.model';
import { SystemReportDTO, UserReportDTO } from './report.dto';
import { ReportType } from '../enum/report.enum';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(Report)
        private readonly model: ReturnModelType<typeof Report>,
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

    createUserReport(userReport: UserReportDTO): Promise<Report> {
        const report = new this.model({ type: ReportType.User, ...userReport });
        return report.save();
    }

    createSystemReport(systemReport: SystemReportDTO): Promise<Report> {
        const report = new this.model({ type: ReportType.System, ...systemReport});
        return report.save();
    }
}
