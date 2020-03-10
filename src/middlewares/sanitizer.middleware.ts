import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { sanitize } from 'class-sanitizer';

@Injectable()
export class SanitizerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        sanitize(req.body);
        sanitize(req.params);
        sanitize(req.query);
        next();
    }
}
