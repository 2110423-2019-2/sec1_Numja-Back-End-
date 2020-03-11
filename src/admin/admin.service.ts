import { Injectable } from '@nestjs/common';
import { UserStatus } from '../enum/user.enum';
import { UserService } from 'src/user/user.service';
import { InjectModel } from 'nestjs-typegoose';

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
