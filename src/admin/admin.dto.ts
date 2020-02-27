import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SuspendOrActivateDTO {
    @ApiProperty({ required: true })
    @IsString()
    userId: string;
}
