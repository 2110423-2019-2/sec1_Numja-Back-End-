import {
    Body,
    Controller,
    Patch,
    Post,
    UseGuards,
    Get,
    Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { SuspendOrActivateDTO } from './admin.dto';
import { UserRole } from '../enum/user.enum';
import { UserId } from '../decorators/user-id.decorator';
import { TransactionService } from '../transaction/transaction.service';
import { TransactionType } from '../enum/transaction.enum';
import { TransferTransactionDTO } from 'src/transaction/transaction.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/model/user.model';

@ApiBearerAuth()
@ApiTags('Admin')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.Admin)
@Controller('admin')
export class AdminController {
    constructor(
        private readonly service: AdminService,
        private readonly transactionService: TransactionService,
        private readonly userService: UserService,
    ) {}

    @Patch('suspend')
    suspend(@Body() { userId }: SuspendOrActivateDTO) {
        return this.service.suspend(userId);
    }

    @Patch('activate')
    activate(@Body() { userId }: SuspendOrActivateDTO) {
        return this.service.activate(userId);
    }

    @Post('transfer')
    transfer(
        @UserId() issuerId: string,
        @Body() transactionDTO: TransferTransactionDTO,
    ) {
        return this.transactionService.createTransaction({
            type: TransactionType.Transfer,
            issuerId,
            ...transactionDTO,
        });
    }

    @Post('verifyTutor/:id')
    verifyTutor(@Param('id') id: string) {
        return this.userService.update(id, { verified: true });
    }

    @Post('unverifyTutor/:id')
    unverifyTutor(@Param('id') id: string) {
        return this.userService.update(id, { verified: false });
    }

    @Get('findTutors')
    findTutors(): Promise<User[]> {
        return this.userService.find(UserRole.Tutor);
    }
}
