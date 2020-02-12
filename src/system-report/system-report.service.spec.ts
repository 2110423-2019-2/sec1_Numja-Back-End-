import { Test, TestingModule } from '@nestjs/testing';
import { SystemReportService } from './system-report.service';

describe('SystemReportService', () => {
  let service: SystemReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemReportService],
    }).compile();

    service = module.get<SystemReportService>(SystemReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
