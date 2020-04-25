import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Transaction } from '../model/transaction.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserService } from '../user/user.service';
import { TransactionDTO } from './transaction.dto';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction)
        private readonly model: ReturnModelType<typeof Transaction>,
        private readonly userService: UserService,
    ) {}

    async createTransaction({
        type,
        issuerId,
        senderId,
        receiverId,
        amount,
    }: TransactionDTO) {
        let sender, receiver;
        const issuer = await this.userService.findById(issuerId);

        if (senderId) {
            sender = await this.userService.findById(senderId);
            if (!sender) throw new BadRequestException("Invalid Sender ID")
        }
        if (receiverId) {
            receiver = await this.userService.findById(receiverId);
            if (!receiver) throw new BadRequestException("Invalid Receiver ID")
        }

        const transaction = new this.model({
            type,
            issuer,
            sender,
            receiver,
            amount,
        });

        if (sender && sender.credit < amount) {
            throw new BadRequestException('Sender credit is insufficient');
        }

        const session = await this.model.db.startSession();
        session.startTransaction();
        try {
            if (senderId) {
                await this.userService.update(
                    senderId,
                    { credit: sender.credit - amount },
                    session,
                );
            }
            if (receiverId) {
                await this.userService.update(
                    receiverId,
                    { credit: receiver.credit + amount },
                    session,
                );
            }
            await session.commitTransaction();
            return transaction.save();
        } catch {
            await session.abortTransaction();
            throw new InternalServerErrorException();
        }
    }
}
