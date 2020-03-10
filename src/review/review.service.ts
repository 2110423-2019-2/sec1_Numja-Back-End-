import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Review } from 'src/model/review.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserService } from 'src/user/user.service';
import { CreateReviewDTO, UpdateReviewDTO } from './review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review)
        private readonly model: ReturnModelType<typeof Review>,
        private readonly userService: UserService,
    ) {}

    find(filters?): Promise<Review[]> {
        return this.model.find(filters).exec();
    }

    findById(id: string): Promise<Review> {
        return this.model.findById(id).exec();
    }

    async findByReviewedUserId(reviewedUserId: string): Promise<Review[]> {
        const reviewedUser = await this.userService.findById(reviewedUserId);
        return this.find({ reviewedUser: reviewedUser });
    }

    async findByReviewerUserId(reviewerUserId: string): Promise<Review[]> {
        const reviewerUser = await this.userService.findById(reviewerUserId);
        return this.find({ reviewerUser: reviewerUser });
    }

    async create(
        createReviewDTO: CreateReviewDTO,
        reviewerId: string,
    ): Promise<Review> {
        const reviewerUser = await this.userService.findById(reviewerId);
        const reviewedUser = await this.userService.findById(
            createReviewDTO.reviewedUserId,
        );
        const reviewObject = new this.model({
            comment: createReviewDTO.comment,
            rating: createReviewDTO.rating,
            reviewerUser: reviewerUser,
            reviewedUser: reviewedUser,
        });
        return reviewObject.save();
    }

    update(
        id: string,
        updateReviewDTO: UpdateReviewDTO,
    ): Promise<Review> {
        return this.model.findByIdAndUpdate(id, updateReviewDTO).exec();
    }
}
