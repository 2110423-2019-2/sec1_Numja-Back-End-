import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDTO {
    @ApiProperty()
    comment: string;

    @ApiProperty()
    rating: number;
}

export class CreateReviewDTO{
    @ApiProperty({ required: true })
    reviewedUserId: string;

    @ApiProperty()
    comment: string;

    @ApiProperty({ required: true })
    rating: number;
}
