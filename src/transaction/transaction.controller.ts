import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { TransactionService } from './transaction.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { BaseTransactionDTO, TransferTransactionDTO } from './transaction.dto';
import { TransactionType } from 'src/enum/transaction.enum';
import { StatusGuard } from '../guards/status.guard';

@ApiBearerAuth()
@ApiTags('Transaction')
@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
    constructor(private readonly service: TransactionService) {}

    @UseGuards(StatusGuard)
    @Post('top-up')
    topUp(
        @Body() transactionDTO: BaseTransactionDTO,
        @UserId() userId: string,
    ) {
        return this.service.createTransaction({
            type: TransactionType.TopUp,
            issuerId: userId,
            receiverId: userId,
            ...transactionDTO,
        });
    }

    @Post('withdraw')
    withdraw(
        @Body() transactionDTO: BaseTransactionDTO,
        @UserId() userId: string,
    ) {
        return this.service.createTransaction({
            type: TransactionType.Withdraw,
            issuerId: userId,
            senderId: userId,
            ...transactionDTO,
        });
    }

    @UseGuards(StatusGuard)
    @Post('transfer')
    transfer(
        @Body() transactionDTO: TransferTransactionDTO,
        @UserId() userId: string,
    ) {
        return this.service.createTransaction({
            type: TransactionType.Transfer,
            issuerId: userId,
            ...transactionDTO,
        });
    }
}
