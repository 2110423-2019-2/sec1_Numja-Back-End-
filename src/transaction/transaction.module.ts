import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Transaction } from '../model/transaction.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Transaction,
                schemaOptions: { timestamps: true },
            },
        ]),
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
    exports: [TransactionService],
})
export class TransactionModule {}
