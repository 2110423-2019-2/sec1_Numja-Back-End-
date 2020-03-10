import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDTO{

    @ApiProperty({ required: true })
    comment: string;

    @ApiProperty({ required: true })
    rating: number;
}

export class CreateReviewDTO extends UpdateReviewDTO{
    
    @ApiProperty({ required: true })
    reviewedUserId: string;
}
