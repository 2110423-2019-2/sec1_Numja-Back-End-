import {
    Controller,
    UseGuards,
    UseInterceptors,
    Get,
    Post,
    Body,
    Param,
    UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard';
import { UserId } from '../decorators/user-id.decorator';
import { User } from '../model/user.model';
import { RolesGuard } from '../guards/roles.guard';
import { StatusGuard } from '../guards/status.guard';
import { UserRole } from '../enum/user.enum';
import { Roles } from '../decorators/roles.decorator';
import { EvidenceDTO } from 'src/model/evidence.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../file/file.service';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(AuthGuard, RolesGuard, StatusGuard)
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Roles(UserRole.Admin)
    @Get()
    find(): Promise<User[]> {
        return this.service.find();
    }

    @Roles(UserRole.Admin, UserRole.Tutor, UserRole.Student)
    @Get('me')
    me(@UserId() id: string): Promise<User> {
        return this.service.findById(id);
    }

    @Roles(UserRole.Admin, UserRole.Tutor, UserRole.Student)
    @Get('id/:id')
    findById(@Param('id') id: string): Promise<User> {
        return this.service.findById(id);
    }

    @UseGuards(AuthGuard)
    @Roles(UserRole.Tutor)
    @Post('updateEvidence')
    updateEvidence(@UserId() id: string, @Body() EvidenceDTO: EvidenceDTO) {
        return this.service.updateEvidence(id, EvidenceDTO);
    }

    @Post(':id/portfolio/upload')
    @UseInterceptors(FileInterceptor('file', { dest: '/tmp/upload' }))
    uploadPortfolio(@UserId() id: string, @UploadedFile() file) {
        return this.service.uploadPortfolio(`portfolio/${id}`, file);
    }
}
