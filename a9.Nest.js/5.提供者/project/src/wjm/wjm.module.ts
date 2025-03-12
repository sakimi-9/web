import { Module } from '@nestjs/common';
import { WjmService } from './wjm.service';
import { WjmController } from './wjm.controller';

@Module({
  controllers: [WjmController],
  providers: [WjmService],
})
export class WjmModule { }


// 提供者
//在 Module 中引入

@Module({   //@Module() 的作用：定义一个模块（Module），模块是 NestJS 中组织代码的基本单元。
  // 模块的作用：模块告诉 NestJS 如何组织和加载代码，包括哪些控制器（Controllers）、提供者（Providers）和模块（Modules）需要被对应加载
  controllers: [WjmController],//告诉之后，nest会让此控制器 处理http请求 
  providers: [WjmService] //nest会让此提供者 自动实例化，在需要的地方注入调用
})
export class UserModule { }