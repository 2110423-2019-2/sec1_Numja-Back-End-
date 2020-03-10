import { Injectable, NotFoundException } from '@nestjs/common';
import { UserStatus, UserRole } from '../enum/user.enum';
import { UserService } from 'src/user/user.service';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/model/user.model';

@Injectable()
export class AdminService {
    constructor(private readonly userService: UserService) {}

    suspend(id: string) {
        return this.userService.update(id, { status: UserStatus.Suspended });
    }

    activate(id: string) {
        return this.userService.update(id, { status: UserStatus.Active });
    }
}
