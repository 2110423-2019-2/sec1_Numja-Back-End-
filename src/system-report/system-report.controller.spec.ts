import { Test, TestingModule } from '@nestjs/testing';
import { SystemReportController } from './system-report.controller';

describe('SystemReport Controller', () => {
  let controller: SystemReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemReportController],
    }).compile();

    controller = module.get<SystemReportController>(SystemReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
