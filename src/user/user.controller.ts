import { Controller, UseGuards, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard';
import { UserId } from '../decorators/user-id.decorator';
import { User } from '../model/user.model';
import { UserRole } from '../enum/user.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { EvidenceDTO } from 'src/model/evidence.dto';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(AuthGuard, RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get('me')
    me(@UserId() id: string): Promise<User> {
        return this.service.findById(id);
    }

    @Roles(UserRole.Tutor)
    @Post('updateEvidence')
    updateEvidence(@UserId() id: string, @Body() EvidenceDTO: EvidenceDTO) {
        return this.service.update(id, EvidenceDTO);
    }
}
