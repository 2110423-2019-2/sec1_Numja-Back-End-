import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../model/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { UserStatus } from '../enum/user.enum';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User) private readonly model: ReturnModelType<typeof User>,
    ) {}

    suspend(id: string) {
        this.model
            .findByIdAndUpdate(id, { status: UserStatus.Suspended })
            .exec();
    }

    reactivate(id: string) {
        this.model.findByIdAndUpdate(id, { status: UserStatus.Active }).exec();
    }
}
