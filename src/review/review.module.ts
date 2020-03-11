import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Review } from '../model/review.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Review,
                schemaOptions: { timestamps: true },
            },
        ]),
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [ReviewService],
})
export class ReviewModule {}
