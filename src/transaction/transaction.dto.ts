import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../enum/transaction.enum';

export class TransactionDTO {
    type: TransactionType;
    issuerId: string;
    senderId?: string;
    receiverId?: string;
    amount: number;
}

export class BaseTransactionDTO {
    @ApiProperty({ required: true })
    amount: number;
}

export class TransferTransactionDTO extends BaseTransactionDTO {
    @ApiProperty({ required: true })
    senderId: string;

    @ApiProperty({ required: true })
    receiverId: string;
}
