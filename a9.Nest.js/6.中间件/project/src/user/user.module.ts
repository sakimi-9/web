import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';


import { LoggerMiddleware } from '../middleware/logger.middleware';


//使用中间件
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {// 模块上注册使用中间件 需要实现NestModule
  configure(consumer: MiddlewareConsumer) {//类，在模块中使用中间件时，提供具体的配置方法
    consumer
      .apply(LoggerMiddleware)//指定使用的 中间件
      .forRoutes({ path: 'user', method: RequestMethod.GET });//指定中间件应用到的路由 路径及请求方法
  }
}