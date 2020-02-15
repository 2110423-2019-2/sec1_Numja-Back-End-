import { Controller, Body, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { SuspendOrActivateDTO } from './admin.dto';

@ApiTags('Admin')
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
