import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './auth.dto';
import { User } from '../model/user.model';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post('login')
    async login(@Body() credentials: AuthCredentialsDTO): Promise<string> {
        return this.service.login(credentials);
    }

    @Post('register')
    async register(@Body() userDTO: User): Promise<string> {
        return this.service.register(userDTO);
    }
}
