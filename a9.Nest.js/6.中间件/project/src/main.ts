import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);//NestFactory 用于初始化和加载应用的工具类
  app.use(LoggerMiddleware);//根组件上注册使用中间件，中间件就变成全局中间件了
  app.use(cors()); // 根组件上注册使用第三方中间件
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
