import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

export class Review {
    _id?: mongoose.Types.ObjectId;

    @prop({ required: true })
    title: string;

    @prop({ required: true })
    description: string;

    @prop({ ref: User, required: true })
    reviewerUser: Ref<User>;

    @prop({ ref: User })
    reviewedUser: Ref<User>;
}
