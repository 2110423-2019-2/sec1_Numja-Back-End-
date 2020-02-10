import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject('UserService') private readonly userService: UserService,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        if (req.userId) {
            return this.userService.exists(req.userId);
        }
        return false;
    }
}
