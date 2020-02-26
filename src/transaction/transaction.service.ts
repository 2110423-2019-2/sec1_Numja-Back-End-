import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Transaction } from '../model/transaction.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserService } from '../user/user.service';
import { UserRole, UserStatus } from '../enum/user.enum';

@Injectable()
export class TransactionService {
    constructor(
       @InjectModel(Transaction)
       private readonly model: ReturnModelType<typeof Transaction>,
       private readonly userService: UserService,
    ) {}

    async transfer(issuerId: string, senderId: string, receiverId: string, amount: number) {
        const issuer = await this.userService.findById(issuerId);
        const sender = await this.userService.findById(senderId);
        const receiver = await this.userService.findById(receiverId);

        if (issuer.role !== UserRole.Admin && issuer.status === UserStatus.Suspended)
        if (amount < 50) throw new BadRequestException('Minimum transfer is 50 Numja');
        if (!sender) throw new NotFoundException('Invalid sender ID');
        if (!receiver) throw new NotFoundException('Invalid receiver ID');
        if (sender.credit == 0 || sender.credit < amount) throw new BadRequestException('Sender credit is insufficient');

        const session = await this.model.db.startSession();
        session.startTransaction();
        try {
            const updatedSender = await this.userService.update(senderId, { ...sender, credit: sender.credit - amount }, session);
            const updatedReceiver = await this.userService.update(receiverId, { ...receiver, credit: receiver.credit + amount }, session);
            await session.commitTransaction();
            return { sender: updatedSender, receiver: updatedReceiver };
        } catch (e) {
            await session.abortTransaction();
            throw new InternalServerErrorException();
        }
    }

        // await this.model.db.startSession()
        //     .then(_session => {
        //         session.startTransaction();
        //         return this.userService.update(senderId, { ...sender, credit: sender.credit - amount }, session);
        //     })
        //     .then(()  => {
        //         return this.userService.update(receiverId, { ...receiver, credit: receiver.credit + amount }, session);
        //     })
        //     .then(() => {
        //         session.commitTransaction();
        //     })
        //     .catch(() => {
        //         session.abortTransaction();
        //         throw new InternalServerErrorException();
        //     })

        //const updatedSender = await this.userService.update(senderId, { ...sender, credit: sender.credit - amount });
        //const updatedReceiver = await this.userService.update(receiverId, { ...receiver, credit: receiver.credit + amount });
        //return { sender, receiver };
}
