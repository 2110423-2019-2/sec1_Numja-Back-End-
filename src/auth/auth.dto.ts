import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDTO {
    @ApiProperty({ required: true })
    email: string;

    @ApiProperty({ required: true })
    password: string;
}
