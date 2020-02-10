import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../model/user.model';
import { compareSync } from 'bcrypt';
import { AuthCredentialsDTO } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async login(credentials: AuthCredentialsDTO): Promise<string> {
        const user = await this.validateUser(credentials);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.sign(user);
    }

    async register(userDTO: User): Promise<string> {
        const user = await this.userService.create(userDTO);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.sign(user);
    }

    async validateUser({ email, password }: AuthCredentialsDTO): Promise<User> {
        const user: User = await this.userService.findOne({ email }, true);
        if (user && compareSync(password, user.password)) {
            return user;
        }
        return null;
    }

    sign(user: User): string {
        return this.jwtService.sign({ userId: user.id });
    }

    verify(jwt: string): { userId: string } {
        return this.jwtService.verify(jwt);
    }
}
