import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserStatus } from '../enum/user.enum';
import { User } from '../model/user.model';

@Injectable()
export class CreditService {
    constructor(private readonly userService: UserService) {}

    async transfer(id: string, targetId: string, amount: number): Promise<User> {
        const user = await this.userService.findById(id);
        const target = await this.userService.findById(targetId);
        if(targetId === id || !target) throw new NotFoundException('Invalid target ID');
        if(user.status === UserStatus.Suspended) throw  new ForbiddenException('User is suspended');
        if(user.credit === 0 || user.credit < amount) throw new ForbiddenException(`User's credit is insufficient`);
        user.credit -= amount;
        target.credit += amount;
        const isUserUpdated = await this.userService.update(id, user);
        const isTargetUpdated = await this.userService.update(targetId, target);
        return user;
    }
}
