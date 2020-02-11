import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../model/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { UserGender, UserRole, UserStatus } from '../enum/user.enum';
import { UpdateStatusDTO} from './admin.dto'
// import { hashSync } from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User) private readonly model: ReturnModelType<typeof User>,
    ) {}
    
    updateStatus(statusDTO: UpdateStatusDTO) : Promise<User> {
        // const query = { _id: userID };
        // return this.model.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)

        // still needed to be validated and checking status to make restrictedd and constrain d....
        // let updatedUser : User;
        // this.model.findById(statusDTO.id, function (err, user) {
        //     if (err) {
        //         console.log(err)
        //     }
        //     user.status = statusDTO.status
        //     user.save();
        //     updatedUser = user
        // })
        // return updatedUser
        let options = {new: true}
        return this.model.findByIdAndUpdate(statusDTO.id, {status : statusDTO.status},options).exec()
    }
}
