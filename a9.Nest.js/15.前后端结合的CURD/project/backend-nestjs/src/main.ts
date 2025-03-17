import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 启用CORS
    app.enableCors();

    // 全局验证管道
    app.useGlobalPipes(new ValidationPipe());

    // Swagger文档
    const config = new DocumentBuilder()
        .setTitle('用户管理API')
        .setDescription('用户管理系统的API文档')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    console.log('应用已启动: http://localhost:3000');
    console.log('API文档: http://localhost:3000/api');
}
bootstrap(); 