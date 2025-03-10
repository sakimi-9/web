import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: "jiamin",
    name: "sessionId",
    rolling: true,   //每次请求重置cookie过期时间
    cookie: {
      maxAge: 6000000   //cookie配置 过期时间 ms 
    }
  }))
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
