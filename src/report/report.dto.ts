import { Ref } from '@typegoose/typegoose';
import { User } from '../model/user.model';
import { ApiProperty } from '@nestjs/swagger';

export class UserReportDTO {

    @ApiProperty()
    type: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    reporter: Ref<User>;

    @ApiProperty()
    reportedUser: Ref<User>;
}

export class SystemReportDTO {
    @ApiProperty()
    type: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    reporter: Ref<User>;
}
