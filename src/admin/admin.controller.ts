import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { UpdateStatusDTO } from './admin.dto';
import { User } from '../model/user.model';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UserGender, UserRole, UserStatus } from '../enum/user.enum';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly service: AdminService) {}

    @Get('test')
    async pnt(){
        return "test B wtf"
    }
    @Patch('update')
    async updateUserStatus(
        // @Param('id') id:string,
        @Body() statusDTO: UpdateStatusDTO) {
        return this.service.updateStatus(statusDTO)
    }
    // async login(@Body() credentials: AuthCredentialsDTO): Promise<string> {
    //     return this.service.login(credentials);
    // }
}
