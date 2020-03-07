import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { TransactionService } from './transaction.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { BaseTransactionDTO, TransferTransactionDTO } from './transaction.dto';
import { TransactionType } from 'src/enum/transaction.enum';

@ApiBearerAuth()
@ApiTags('Transaction')
@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
    constructor(private readonly service: TransactionService) {}

    @Post('topup')
    topup(
        @Body() baseTransactionDTO: BaseTransactionDTO,
        @UserId() userId: string,
    ) {
        return this.service.createTransaction({
            type: TransactionType.Topup,
            issuerId: userId,
            receiverId: userId,
            ...baseTransactionDTO,
        });
    }

    @Post('withdraw')
    withdraw(
        @Body() baseTransactionDTO: BaseTransactionDTO,
        @UserId() userId: string,
    ) {
        return this.service.createTransaction({
            type: TransactionType.Withdraw,
            issuerId: userId,
            senderId: userId,
            ...baseTransactionDTO,
        });
    }

    @Post('transfer')
    transfer(
        @Body() transferTransactionDTO: TransferTransactionDTO,
        @UserId() userId: string,
    ) {
        return this.service.createTransaction({
            type: TransactionType.Transfer,
            issuerId: userId,
            ...transferTransactionDTO,
        });
    }
}
