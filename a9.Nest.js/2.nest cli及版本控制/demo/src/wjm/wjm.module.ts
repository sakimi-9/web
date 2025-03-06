import { Module } from '@nestjs/common';
import { WjmService } from './wjm.service';
import { WjmController } from './wjm.controller';

@Module({
  controllers: [WjmController],
  providers: [WjmService],
})
export class WjmModule {}
