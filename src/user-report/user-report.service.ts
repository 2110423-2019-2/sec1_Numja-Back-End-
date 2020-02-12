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

    create(reportDTO: UserReport): Promise<UserReport> {
        const report = new this.model(reportDTO);
        return report.save();
    }
}
