import { Module } from '@nestjs/common';
import { AdminController } from '../admin/admin.controller';
import { AdminService } from '../admin/admin.service';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
    imports: [TransactionModule],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}