import { Test, TestingModule } from '@nestjs/testing';
import { WjmService } from './wjm.service';

describe('WjmService', () => {
  let service: WjmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WjmService],
    }).compile();

    service = module.get<WjmService>(WjmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

