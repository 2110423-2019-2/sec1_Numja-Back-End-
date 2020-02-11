import { ApiProperty } from '@nestjs/swagger';
import { UserStatus} from '../enum/user.enum'
export class UpdateStatusDTO {
    // @ApiProperty()
    // status: UserStatus;

    @ApiProperty()
    id : string;
}
