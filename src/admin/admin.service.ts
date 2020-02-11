import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../model/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { UserGender, UserRole, UserStatus } from '../enum/user.enum';

// import { hashSync } from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User) private readonly model: ReturnModelType<typeof User>,
    ) {}
    
    suspend(userID: number) : Promise<User> {
        // const query = { _id: userID };
        // return this.model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)
        return this.model.findById(userID, function (err, user) {
            if (err) {
                console.log(err)
            }
            user.status = UserStatus.Suspended;
            console.log(user)
            user.save();
        }).exec();
    }
}
