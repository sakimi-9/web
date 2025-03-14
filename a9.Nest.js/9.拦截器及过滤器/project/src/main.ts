import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from "./common/Interceptor";
import { HttpFilter } from "./common/Filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 根组件上注册使用全局拦截器     使用的是 Response拦截器的实例 
  app.useGlobalInterceptors(new Response())

  // 根组件上注册使用全局异常过滤器   使用的是 HttpFilter过滤器的实例 
  app.useGlobalFilters(new HttpFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
