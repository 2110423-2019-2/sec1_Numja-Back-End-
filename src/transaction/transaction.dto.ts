import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../enum/transaction.enum';

export class TransactionDTO {
    type: TransactionType;
    issuerId: string;
    senderId?: string;
    receiverId?: string;
    amount: number;
}

export class AdminTransferTransactionDTO {
    @ApiProperty({ required: true })
    senderId: string;

    @ApiProperty({ required: true })
    receiverId: string;

    @ApiProperty({ required: true })
    amount: number;
}
