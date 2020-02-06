import { prop, mongoose } from '@typegoose/typegoose';
import { UserGender, UserRole, UserStatus } from '../enum/user.enum';

export class User {
    _id?: mongoose.Types.ObjectId;

    get id() {
        return this._id;
    }

    @prop({ required: true })
    firstName: string;

    @prop({ required: true })
    lastName: string;

    @prop()
    birthDate?: Date;

    @prop({ required: true })
    email: string;

    @prop({ required: true, select: false })
    password: string;

    @prop()
    address?: string;

    @prop({ enum: UserGender, required: true })
    gender: UserGender;

    @prop({ required: true })
    ssin: string;

    @prop({ enum: UserRole, required: true })
    role: UserRole;

    @prop({ enum: UserStatus, required: true, default: UserStatus.Active })
    status: UserStatus;
}
