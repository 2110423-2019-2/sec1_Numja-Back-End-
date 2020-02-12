import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly service: AdminService) {}

    @Patch('suspend/:id')
    async suspend(@Param('id') id: string) {
        this.service.suspend(id);
    }

    @Patch('activate/:id')
    async activate(@Param('id') id: string) {
        this.service.reactivate(id);
    }
}
