import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';  //引入RESTful风格的API版本控制
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,  //根组件使用url版本控制   然后去控制器文件中  控制器级别：控制器的修饰器工厂中指定路径与版本号    路由级别：在添加路由的版本控制修饰器工厂中指定版本

    // type:VersioningType.HEADER,  //根组件使用请求头版本控制   
    // header：‘custom-version’     设置自定义请求头，通过在请求头中添加自定义字段（如 Custom-Header: 1）来指定版本。     

    // type:VersioningType.MEDIA_TYPE, //根组件使用媒体类型版本控制
    // key:'v='  通过在 Accept 请求头中添加版本信息（如 application/json;v=2）来指定版本。

    defaultVersion: '1',  //默认版本号 不指定的情况下使用

  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
