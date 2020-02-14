import { ApiProperty } from '@nestjs/swagger';

export class SystemReportDTO {
    @ApiProperty({ required: true })
    title: string;

    @ApiProperty({ required: true })
    description: string;

    @ApiProperty({ required: true })
    reporterId: string;
}

export class UserReportDTO extends SystemReportDTO{
    @ApiProperty({ required: true })
    reportedUserId: string;
}
