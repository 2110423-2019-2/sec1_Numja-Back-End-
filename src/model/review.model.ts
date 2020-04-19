import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { IsOptional, IsNumber } from 'class-validator';

export class Review {
    _id?: mongoose.Types.ObjectId;

    @IsOptional()
    @prop()
    comment?: string;

    @prop({ ref: User, required: true })
    reviewerUser: Ref<User>;

    @prop({ ref: User })
    reviewedUser: Ref<User>;

    @IsNumber()
    @prop({ required: true, min: 1, max: 5 })
    rating: number;
}
