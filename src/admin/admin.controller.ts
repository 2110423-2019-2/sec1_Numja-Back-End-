import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Get,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Admin')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly service: AdminService) {}

    @Patch('suspend')
    suspend(@Body('id') id: string) {
        return this.service.suspend(id);
    }

    @Patch('activate')
    activate(@Body('id') id: string) {
        return this.service.activate(id);
    }
}
