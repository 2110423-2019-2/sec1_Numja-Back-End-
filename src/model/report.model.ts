import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { ReportType } from '../enum/report.enum';

export class Report {
    _id?: mongoose.Types.ObjectId;

    get id() {
        return this._id;
    }

    @prop({ required: true })
    type: ReportType;

    @prop({ required: true })
    title: string;

    @prop({ required: true })
    description: string;

    @prop({ ref: User, required: true })
    reporter: Ref<User>;

    @prop({ ref: User })
    reportedUser: Ref<User>;
}
