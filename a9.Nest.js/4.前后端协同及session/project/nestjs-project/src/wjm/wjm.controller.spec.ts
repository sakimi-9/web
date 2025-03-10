import { Test, TestingModule } from '@nestjs/testing';
import { WjmController } from './wjm.controller';
import { WjmService } from './wjm.service';

describe('WjmController', () => {
  let controller: WjmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WjmController],
      providers: [WjmService],
    }).compile();

    controller = module.get<WjmController>(WjmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
