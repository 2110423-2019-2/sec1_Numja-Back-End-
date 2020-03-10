import { ApiProperty } from '@nestjs/swagger';

export class ReviewDTO {
    @ApiProperty({ required: true })
    comment: string;

    @ApiProperty({ required: true })
    rating: number;

    @ApiProperty({ required: true })
    reviewedUserId: string;
}
