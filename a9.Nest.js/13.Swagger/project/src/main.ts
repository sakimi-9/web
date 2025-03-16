// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './user/swagger.doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  generateDocument(app); // 初始化 Swagger 文档
  await app.listen(3000);
  console.log('Swagger 文档地址：http://localhost:3000/api/doc');
}

bootstrap();