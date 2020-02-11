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
        let options = {new: true}
        return this.model.findByIdAndUpdate(statusDTO.id, {status : statusDTO.status},options).exec()
    }
}
