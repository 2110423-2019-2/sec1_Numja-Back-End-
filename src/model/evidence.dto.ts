import { ApiProperty } from '@nestjs/swagger';

export class EvidenceDTO {
    @ApiProperty({ required: true })
    evidenceInfo: string;

    @ApiProperty({ required: true })
    evidenceSentDate: Date;
}
