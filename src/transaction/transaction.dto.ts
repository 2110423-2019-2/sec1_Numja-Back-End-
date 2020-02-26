import { ApiProperty } from '@nestjs/swagger';

export class AdminTransferTransactionDTO {
    @ApiProperty({ required: true })
    senderId: string;

    @ApiProperty({ required: true })
    receiverId: string;

    @ApiProperty({ required: true })
    amount: number;
}
