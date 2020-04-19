import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { User } from '../model/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        @Inject('UserService') private readonly userService: UserService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getClass());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: User = await this.userService.findById(request.userId);
        return roles.includes(user.role);
    }
}
