import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserReport } from '../model/user-report.model';

@Injectable()
export class UserReportService {
    constructor(
        @InjectModel(UserReport)
        private readonly model: ReturnModelType<typeof UserReport>,
    ) {}

    find(): Promise<UserReport[]> {
        return this.model.find().exec();
    }
    findById(reportId: string): Promise<UserReport> {
        return this.model.findById(reportId).exec();
    }
    create(reportDTO: UserReport): Promise<UserReport> {
        const report = new this.model(reportDTO);
        return report.save();
    }
}
