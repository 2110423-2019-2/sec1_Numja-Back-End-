import { prop } from '@typegoose/typegoose';
import { UserGender, UserRole, UserStatus } from '../enum/user.enum';

export class User {
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
