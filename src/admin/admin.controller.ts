import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { UpdateStatusDTO } from './admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly service: AdminService) {}

    @Patch('update')
    async updateUserStatus(
        @Body() statusDTO: UpdateStatusDTO) {
        return this.service.updateStatus(statusDTO)
    }
}
