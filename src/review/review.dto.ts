import { ApiProperty } from '@nestjs/swagger';

export class ReviewDTO {
    @ApiProperty({ required: true })
    title: string;

    @ApiProperty({ required: true })
    description: string;

    @ApiProperty({ required: true })
    reportedUserId: string;
}
