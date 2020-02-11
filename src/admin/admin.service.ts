import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../model/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { UserGender, UserRole, UserStatus } from '../enum/user.enum';
import { UpdateStatusDTO } from './admin.dto'
// import { hashSync } from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User) private readonly model: ReturnModelType<typeof User>,
    ) {}
    
    suspend(idDTO: UpdateStatusDTO)  {
        let options = {new: true}
        this.model.findByIdAndUpdate(idDTO.id, {status : UserStatus.Suspended},options).exec()
    }

    reactivate(idDTO: UpdateStatusDTO) {
        let options = {new:true}
        this.model.findByIdAndUpdate(idDTO.id, {status : UserStatus.Active},options).exec()
    }
}
