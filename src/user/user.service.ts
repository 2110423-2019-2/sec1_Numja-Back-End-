import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../model/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { hashSync } from 'bcryptjs';
import { ClientSession } from 'mongoose';
import { UserRole } from '../enum/user.enum';
import { EvidenceDTO } from 'src/model/evidence.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly model: ReturnModelType<typeof User>,
    ) {}

    find(role?: UserRole): Promise<User[]> {
        if(role) {
            return this.model
            .find({
                role: role,
            })
            .exec();
        }
        return this.model.find().exec();
    }

    findById(id: string): Promise<User> {
        return this.model.findById(id).exec();
    }

    findOne(conditions: any, password?: boolean): Promise<User> {
        if (password) {
            return this.model.findOne(conditions, '+password').exec();
        }
        return this.model.findOne(conditions).exec();
    }

    exists(id: string): Promise<boolean> {
        return this.model.exists({ _id: id });
    }

    create({ password, ...userDTO }: User): Promise<User> {
        password = hashSync(password, 12);
        const user = new this.model({ ...userDTO, password });
        if (user.role === UserRole.Tutor) {
            user.verified = false;
        }
        return user.save();
    }

    update(
        id: string,
        userDTO: Partial<User>,
        session?: ClientSession,
    ): Promise<User> {
        if (!session)
            return this.model
                .findByIdAndUpdate(id, userDTO, { new: true })
                .exec();
        return this.model
            .findByIdAndUpdate(id, userDTO, { new: true })
            .session(session)
            .exec();
    }
}
