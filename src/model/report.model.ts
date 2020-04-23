import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { ReportType } from '../enum/report.enum';
import { IsString, IsEnum } from 'class-validator';

export class Report {
    _id?: mongoose.Types.ObjectId;

    @IsString()
    @prop({ required: true })
    title: string;

    @IsEnum(ReportType)
    @prop({ enum: ReportType, required: true })
    type: ReportType;

    @IsString()
    @prop({ required: true })
    description: string;

    @prop({ ref: User, required: true })
    reporter: Ref<User>;

    @prop({ ref: User })
    reportedUser: Ref<User>;
}
