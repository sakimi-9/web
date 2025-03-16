import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonGuard } from './Guard/common.guard';//引入寻常守卫

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new CommonGuard()); // 将寻常守卫的实例在根组件上注册为全局守卫，全局守卫将对所有路由生效

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
