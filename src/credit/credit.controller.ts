import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreditService } from './credit.service';
import { UserId } from '../decorators/user-id.decorator';
import { TransferCreditDTO } from './credit.dto';

@ApiBearerAuth()
@ApiTags('Credit')
@UseGuards(AuthGuard)
@Controller('credit')
export class CreditController {
    constructor(private readonly creditService: CreditService) {}

    @Post('transfer')
    transfer(@UserId() id: string, @Body() { targetId, amount}: TransferCreditDTO){
        return this.creditService.transfer(id, targetId, amount)
    }
}
