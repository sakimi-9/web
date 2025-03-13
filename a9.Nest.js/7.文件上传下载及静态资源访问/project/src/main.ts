import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';//NestExpressApplication是一个‘桥梁类’，让nestjs可以无缝使用express中的一些api
import { join } from 'path';

async function bootstrap() {          //泛型指定 指定app的类型为 NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //useStaticAssets是NestExpressApplication中 暴露静态资源可通过url访问的方法
  app.useStaticAssets(join(process.cwd(), 'public/images'), { // 指定静态资源目录  process.cwd()指向项目根目录   __dirname指向文件夹目录
    //   __dirname时   ../public/images 注意编译后该路径实际指向 dis/public/image     避免开发环境与生产环境混淆 要统一路径 使用process.cwd()   
    //这样就能 url访问到静态资源了        如：  http://localhost:3000/ziyaun/filename.extname
    prefix: "/ziyuan" // 设置 静态资源通过url访问的 访问前缀
  });
  await app.listen(3000);
}
bootstrap();