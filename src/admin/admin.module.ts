import { Module } from '@nestjs/common';
import { AdminController } from '../admin/admin.controller';
import { UserModule } from '../user/user.module';
import { AdminService } from '../admin/admin.service';

@Module({
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}
