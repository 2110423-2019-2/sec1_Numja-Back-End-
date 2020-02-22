import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDTO {
    @ApiProperty({ required: true })
    username: string;

    @ApiProperty({ required: true })
    password: string;
}
