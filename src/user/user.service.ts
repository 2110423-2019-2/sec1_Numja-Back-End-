import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../model/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly model: ReturnModelType<typeof User>,
    ) {}

    find(): Promise<User[]> {
        return this.model.find().exec();
    }

    findById(id: string): Promise<User> {
        return this.model.findById(id).exec();
    }

    findOne(conditions: any): Promise<User> {
        return this.model.findOne(conditions).exec();
    }

    create({ password, ...userDTO }: User): Promise<User> {
        password = hashSync(password, 12);
        const user = new this.model({ ...userDTO, password });
        return user.save();
    }
}
