import { mongoose, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

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
    @prop({ required: true })
    reporterUserId: string;
}
