import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SystemReportDTO {
    @ApiProperty({ required: true })
    @IsString()
    title: string;

    @ApiProperty({ required: true })
    @IsString()
    description: string;
}

export class UserReportDTO extends SystemReportDTO {
    @ApiProperty({ required: true })
    @IsString()
    reportedUserId: string;
}
