import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const UserId = createParamDecorator((_, req: Request) => req.userId);
