import { Ref } from '@typegoose/typegoose';
import { User } from '../model/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { ReportType } from '../enum/report.enum';

export class UserReportDTO {
    @ApiProperty()
    id: string;

    @ApiProperty({ enum: ReportType})
    type: ReportType;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    reporter: Ref<User>;

    @ApiProperty()
    reportedUser: Ref<User>;
}

export class SystemReportDTO {
    @ApiProperty()
    id: string;

    @ApiProperty({ enum: ReportType})
    type: ReportType;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    reporter: Ref<User>;
}
