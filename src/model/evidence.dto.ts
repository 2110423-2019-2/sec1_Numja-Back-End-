import { ApiProperty } from '@nestjs/swagger';

export class EvidenceDTO {
    @ApiProperty({ required: true })
    evidenceInfo: String;

    @ApiProperty({ required: true })
    evidenceSentDate: Date;
}
