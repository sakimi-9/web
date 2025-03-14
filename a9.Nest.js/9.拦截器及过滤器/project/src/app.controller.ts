import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  //发送请求 测试拦截器
  @Get('test')
  getData1() {
    return { name: "ezre", age: 259 };
  }

  //发送请求 测试过滤器
  @Get('test_2')
  getData2() {
    throw new HttpException('这是一个错误', HttpStatus.BAD_REQUEST);
  }
}