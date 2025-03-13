import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


//中间件存放及使用位置的说明
//创建的中间件一般都放在单独的 middleware文件夹，在要使用的 模块上注册使用
//全局中间件 也可以在主入口文件创建并在根组件上注册使用，存放在middleware文件夹在引入到主文件使用 更易维护

@Injectable()                        //中间件接口 NestMiddleware   创建中间件时要实现
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {  //use函数 中间件的实现逻辑
        console.log(`Request: ${req.method} ${req.url}`);
        next();
    }
}


// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   constructor(private configService: ConfigService) {}  创建中间件时，也可 依赖注入 来使用提供者

//   use(req: Request, res: Response, next: NextFunction) {
//     const logEnabled = this.configService.get<boolean>('LOG_ENABLED');
//     if (logEnabled) {
//       console.log(`Request: ${req.method} ${req.url}`);
//     }
//     next();
//   }
// }