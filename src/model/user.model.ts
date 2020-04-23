import { prop, mongoose } from '@typegoose/typegoose';
import { UserGender, UserRole, UserStatus } from '../enum/user.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsDate,
    IsNotEmpty,
    IsEmail,
    IsOptional,
    IsEnum,
    IsNumber,
    Length,
    IsNumberString,
} from 'class-validator';
import { ToDate } from 'class-sanitizer';

export class User {
    _id?: mongoose.Types.ObjectId;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @prop({ required: true, unique: true })
    username: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @prop({ required: true })
    firstName: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @prop({ required: true })
    lastName: string;

    @ApiPropertyOptional()
    @IsDate()
    @ToDate()
    @prop()
    birthDate?: Date;

    @ApiProperty({ required: true })
    @IsEmail()
    @prop({ required: true })
    email: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    @prop({ required: true, select: false })
    password: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @prop()
    address?: string;

    @ApiProperty({ enum: UserGender, required: true })
    @IsEnum(UserGender)
    @prop({ enum: UserGender, required: true })
    gender: UserGender;

    @ApiProperty({ required: true })
    @IsNumberString()
    @Length(13, 13)
    @prop({ required: true })
    ssin: string;

    @ApiProperty({ enum: UserRole, required: true })
    @IsEnum(UserRole)
    @prop({ enum: UserRole, required: true })
    role: UserRole;

    @IsOptional()
    @IsEnum(UserStatus)
    @prop({ enum: UserStatus, required: true, default: UserStatus.Active })
    status: UserStatus;

    @IsOptional()
    @IsNumber()
    @prop({ required: true, default: 0 })
    credit: number;

    @prop({ default: false })
    verified: boolean;
}
