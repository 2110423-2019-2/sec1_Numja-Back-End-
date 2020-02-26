import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Transaction } from '../model/transaction.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserService } from '../user/user.service';
import { UserRole, UserStatus } from '../enum/user.enum';
import { TransactionType } from '../enum/transaction.enum';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction)
        private readonly model: ReturnModelType<typeof Transaction>,
        private readonly userService: UserService,
    ) {}

    async transfer(
        issuerId: string,
        senderId: string,
        receiverId: string,
        amount: number,
    ) {
        const issuer = await this.userService.findById(issuerId);
        const sender = await this.userService.findById(senderId);
        const receiver = await this.userService.findById(receiverId);
        const transaction = new this.model({
            type: TransactionType.Transfer,
            issuer,
            sender,
            receiver,
            amount,
        });

        if (
            issuer.role !== UserRole.Admin &&
            issuer.status === UserStatus.Suspended
        )
            throw new ForbiddenException('User is suspended');
        if (amount < 50)
            throw new BadRequestException('Minimum transfer is 50 Numja');
        if (!sender) throw new NotFoundException('Invalid sender ID');
        if (!receiver) throw new NotFoundException('Invalid receiver ID');
        if (sender.credit == 0 || sender.credit < amount)
            throw new BadRequestException('Sender credit is insufficient');

        const session = await this.model.db.startSession();
        session.startTransaction();
        try {
            await this.userService.update(
                senderId,
                { ...sender, credit: sender.credit - amount },
                session,
            );
            await this.userService.update(
                receiverId,
                { ...receiver, credit: receiver.credit + amount },
                session,
            );
            await session.commitTransaction();
            return transaction.save();
        } catch (e) {
            await session.abortTransaction();
            throw new InternalServerErrorException();
        }
    }
}
