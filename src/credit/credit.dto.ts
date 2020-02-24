import { ApiProperty } from '@nestjs/swagger';

export class TransferCreditDTO {
    @ApiProperty({ required: true })
    targetId: string;

    @ApiProperty({ required: true })
    amount: number;
}
