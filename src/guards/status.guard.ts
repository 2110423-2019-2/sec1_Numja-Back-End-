import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { UserStatus } from '../enum/user.enum';

@Injectable()
export class StatusGuard implements CanActivate {
    constructor(
        @Inject('UserService') private readonly userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        if (req.userId) {
            const user = await this.userService.findById(req.userId);
            return user.status === UserStatus.Active;
        }
        return false;
    }
}
