import { Module } from '@nestjs/common';
import { AdminController } from '../admin/admin.controller';
import { AdminService } from '../admin/admin.service';
import { TransactionModule } from '../transaction/transaction.module';
import { FileModule } from '../file/file.module';

@Module({
    imports: [TransactionModule, FileModule],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}
