import { Module } from '@nestjs/common';
import { AppController, CommonGuardController, RoleGuardController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, CommonGuardController, RoleGuardController],
  providers: [AppService],
})
export class AppModule { }
