import { mongoose, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';

export class SystemReport {
    _id?: mongoose.Types.ObjectId;

    get id() {
        return this._id;
    }

    @ApiProperty()
    @prop({ required: true })
    title: string;

    @ApiProperty()
    @prop({ required: true })
    description: string;

    @ApiProperty()
    @prop({ ref: User , required: true })
    reporter: Ref<User>;
}
