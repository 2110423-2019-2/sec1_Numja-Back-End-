import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { UpdateStatusDTO } from './admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly service: AdminService) {}

    @Patch('suspend')
    async suspend(@Body() idDTO: UpdateStatusDTO) {
        this.service.suspend(idDTO);
    }

    @Patch('activate')
    async activate(@Body() idDTO: UpdateStatusDTO) {
        this.service.reactivate(idDTO);
    }
}
