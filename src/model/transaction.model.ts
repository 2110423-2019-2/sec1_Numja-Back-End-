import { prop, mongoose, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { TransactionType } from '../enum/transaction.enum';

export class Transaction {
    _id?: mongoose.Types.ObjectId;

    @prop({ enum: TransactionType, required: true })
    type: TransactionType;

    @prop({ ref: User, required: true })
    issuer: Ref<User>;

    @prop({ ref: User })
    sender?: Ref<User>;

    @prop({ ref: User })
    receiver?: Ref<User>;

    @prop({ require: true })
    amount: number;
}
