import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  path: 'user',
  version: '1'  //版本控制 控制器级别     VERSION_NEUTRAL 版本中性路由 让路由忽略版本控制
})
export class AppController {
  constructor(private readonly appService: AppService) { }
  // @Version('1') //版本控制 路由级别  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
