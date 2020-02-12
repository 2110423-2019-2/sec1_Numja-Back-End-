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
        let options = { new: true };
        this.model
            .findByIdAndUpdate(
                id,
                { status: UserStatus.Suspended },
                options,
            )
            .exec();
    }

    reactivate(id: string) {
        let options = { new: true };
        this.model
            .findByIdAndUpdate(id, { status: UserStatus.Active }, options)
            .exec();
    }
}
