import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WjmModule } from './wjm/wjm.module';

@Module({
  imports: [WjmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
