import { Module } from '@nestjs/common';
import { AdminController } from '../admin/admin.controller';
import { UserModule } from '../user/user.module';
import { AdminService } from '../admin/admin.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '../model/user.model';
@Module({
    imports: [
        TypegooseModule.forFeature([
            { typegooseClass: User, schemaOptions: { timestamps: true } },
        ]),
        UserModule,
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService],
})
export class AdminModule {}
