import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDTO {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
