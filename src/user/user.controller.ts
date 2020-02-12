import { Controller, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard';
import { UserId } from '../decorators/user-id.decorator';
import { User } from '../model/user.model';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @UseGuards(AuthGuard)
    @Get('me')
    me(@UserId() id: string): Promise<User> {
        return this.service.findById(id);
    }
}

//asdwja;kd
