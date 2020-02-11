import { Module } from '@nestjs/common';
import { UserController } from '../admin/admin.controller';
import { UserModule } from '../user/user.module';
import { AdminService } from '../admin/admin.service';
// import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '../model/user.model';

@Module({
    imports: [
        UserModule
    ],
    controllers: [UserController],
    providers: [AdminService],
    exports: [AdminService],
})
export class AdminModule {}
