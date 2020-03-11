import { prop, mongoose } from '@typegoose/typegoose';
import { UserGender, UserRole, UserStatus } from '../enum/user.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
    _id?: mongoose.Types.ObjectId;

    @ApiProperty({ required: true })
    @prop({ required: true })
    username: string;

    @ApiProperty({ required: true })
    @prop({ required: true })
    firstName: string;

    @ApiProperty({ required: true })
    @prop({ required: true })
    lastName: string;

    @ApiPropertyOptional()
    @prop()
    birthDate?: Date;

    @ApiProperty({ required: true })
    @prop({ required: true })
    email: string;

    @ApiProperty({ required: true })
    @prop({ required: true, select: false })
    password: string;

    @ApiPropertyOptional()
    @prop()
    address?: string;

    @ApiProperty({ enum: UserGender, required: true })
    @prop({ enum: UserGender, required: true })
    gender: UserGender;

    @ApiProperty({ required: true })
    @prop({ required: true })
    ssin: string;

    @ApiProperty({ enum: UserRole, required: true })
    @prop({ enum: UserRole, required: true })
    role: UserRole;

    @prop({ enum: UserStatus, required: true, default: UserStatus.Active })
    status?: UserStatus;

    @prop({ required: true, default: 0 })
    credit: number;

    @prop({ default: "" })
    evidenceInfo: String;

    @prop({ default: "" })
    evidenceSentDate: Date;

    @prop({ default: true })
    verified: boolean;
}
