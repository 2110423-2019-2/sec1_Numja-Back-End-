import { prop, mongoose } from '@typegoose/typegoose';
import { UserGender, UserRole, UserStatus } from '../enum/user.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
    _id?: mongoose.Types.ObjectId;

    get id() {
        return this._id;
    }

    @ApiProperty()
    @prop({ required: true })
    firstName: string;

    @ApiProperty()
    @prop({ required: true })
    lastName: string;

    @ApiPropertyOptional()
    @prop()
    birthDate?: Date;

    @ApiProperty()
    @prop({ required: true })
    email: string;

    @ApiProperty()
    @prop({ required: true, select: false })
    password: string;

    @ApiPropertyOptional()
    @prop()
    address?: string;

    @ApiProperty({ enum: UserGender })
    @prop({ enum: UserGender, required: true })
    gender: UserGender;

    @ApiProperty()
    @prop({ required: true })
    ssin: string;

    @ApiProperty({ enum: UserRole })
    @prop({ enum: UserRole, required: true })
    role: UserRole;

    @prop({ enum: UserStatus, required: true, default: UserStatus.Active })
    status?: UserStatus;
}
