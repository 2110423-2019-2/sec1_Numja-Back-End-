import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly service: AdminService) {}

    @Patch('suspend')
    suspend(@Body('id') id: string) {
        return this.service.suspend(id);
    }

    @Patch('activate')
    activate(@Body('id') id: string) {
        return this.service.reactivate(id);
    }
}
