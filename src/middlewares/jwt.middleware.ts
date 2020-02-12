import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {}

    use(req: Request, res: Response, next: NextFunction) {
        try {
            const header = req.headers.authorization;
            if (header) {
                const jwt = header.split('Bearer ')[1];
                req.userId = this.authService.verify(jwt).userId;
            } else {
                req.userId = null;
            }
        } catch {
            req.userId = null;
        }
        next();
    }
}
