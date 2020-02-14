import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Report } from '../model/report.model';
import { UserReportDTO, SystemReportDTO } from './report.dto';
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
        return this.model.find({ type: ReportType.UserReport }).exec();
    }

    getSystemReports(): Promise<Report[]> {
        return this.model.find({ type: ReportType.SystemReport }).exec();
    }

    createUserReport(userReport: UserReportDTO): Promise<Report> {
        const report = new this.model(userReport);
        return report.save();
    }

    createSystemReport(systemReport: SystemReportDTO): Promise<Report> {
        const report = new this.model(systemReport);
        return report.save();
    }
}
