import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { ReportType } from '../enum/report.enum';

export class Report {
    _id?: mongoose.Types.ObjectId;

    @prop({ required: true })
    title: ReportType;

    @prop({ enum: ReportType, required: true })
    type: ReportType;

    @prop({ required: true })
    description: string;
    
    @prop({ ref: User, required: true })
    reporter: Ref<User>;

    @prop({ ref: User })
    reportedUser: Ref<User>;
}
