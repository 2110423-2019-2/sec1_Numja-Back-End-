import { Controller, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { SuspendOrActivateDTO } from './admin.dto';

@ApiBearerAuth()
@ApiTags('Admin')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly service: AdminService) {}

    @Patch('suspend')
    suspend(@Body() { userId }: SuspendOrActivateDTO) {
        return this.service.suspend(userId);
    }

    @Patch('activate')
    activate(@Body() { userId }: SuspendOrActivateDTO) {
        return this.service.activate(userId);
    }
}
