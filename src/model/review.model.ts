import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

export class Review {
    _id?: mongoose.Types.ObjectId;

    @prop({ required: true })
    comment: string;

    @prop({ ref: User, required: true })
    reviewerUser: Ref<User>;

    @prop({ ref: User })
    reviewedUser: Ref<User>;

    @prop({ required: true, min: 1, max: 5})
    rating: number;
}
