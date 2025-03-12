import { Global, Module } from '@nestjs/common';
import { WjmService } from './wjm.service';
import { WjmController } from './wjm.controller';

@Module({
  controllers: [WjmController],
  providers: [WjmService],
})
export class WjmModule { }


// 提供者
//在 Module文件 中引入 使用@Module注册

@Module({   //@Module() 的作用：定义一个模块（Module），模块是 NestJS 中组织代码的基本单元。
  // 模块的作用：模块告诉 NestJS 如何组织和加载代码，包括哪些控制器（Controllers）、提供者（Providers）和模块（Modules）需要被对应加载
  controllers: [WjmController],//告诉之后，nest会让此控制器 处理http请求 
  providers: [WjmService] //nest会让此提供者 自动实例化，在需要的地方注入调用
})
export class UserModule_1 { }



//模块

@Global() // 添加 @Global 装饰器  装饰此模块块为 全局模块，在其他模块中，不再需要导入 就能直接使用
@Module({
  controllers: [WjmController],
  providers: [WjmController],
  exports: [WjmService], // 导出 WjmService 提供者，在其他模块中，只需要导入 该模块 就能使用 该提供者
})
export class UserModule_2 { }


//在其他文件中的 其他模块
//import { UserModule_2 } from '../wjm/wjm.module';  文件中引入模块
// @Module({
//   controllers: [ListController],
//   imports: [UseModule_2], // 模块中导入 UseModule_2模块,其中的提供者可以通过 文件引入 ListModule 直接注入到需要的地方  
// })
// export class ListModule {}


//  一般写在config.module.ts 
import { DynamicModule } from '@nestjs/common';//引入动态模块的类

interface Options {//定义接口 这里实际上可以与 自定义类型 type 替换
  path: string;
}

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseApi: `/api${options.path}` }, // 为该动态模块设置动态配置  有点像 泛型 ，在指定的时候指定 具体参数
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseApi: `/api${options.path}` }, // 导出配置
        },
      ],
    };
  }
}

// 在其他文件中的 其他模块
// import { Module } from '@nestjs/common';
// import { ConfigModule } from './config/config.module';

// @Module({
//   imports: [                                //模块中导入其他模块，并指定导入的动态模块提供者的具体参数    然后该提供者就有参数可以在构造器中注入调用了
//     ConfigModule.forRoot({ path: '/v1' }), // 动态传递参数
//   ],
// })
// export class AppModule {}