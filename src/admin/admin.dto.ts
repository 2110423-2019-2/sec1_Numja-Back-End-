import { ApiProperty } from '@nestjs/swagger';

export class SuspendOrActivateDTO {
    @ApiProperty({ required: true })
    userId: string;
}
