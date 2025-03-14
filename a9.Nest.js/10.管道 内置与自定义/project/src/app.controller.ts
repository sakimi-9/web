import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { generateUUID } from './utils/uuid.utils';

//管道 处理（转换与验证）外部（如 前端 数据库）传入的数据
//案例1 转换前端传入数据的类型
import { Param } from '@nestjs/common';
import { ParseIntPipe, ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('api/')
export class AppController {

  constructor(private readonly appService: AppService) { }
  @Get()
  getHello(): unknown {
    const newuuid = generateUUID();//利用uuid工具生成uuid
    const msg = this.appService.getHello()
    return {
      msg,
      newuuid   //要设置到请求体里面，下面才可以验证
    };
  }



  @Get(':id')
  //   全局验证管道和自定义管道也可以在控制器中使用   如：
  //   @UsePipes(ValidationPipe) // 使用全局验证管道   
  //   create(@Body() createPDto: CreatePDto) //使用自定义管道 和 内置管道用法一致

  //内置管道 数据转换   
  getItem1(@Param('id', ParseIntPipe) id: number) {//快速获取req的param参数 并限制只要里面的id参数及通过管道转换为数值类型


    console.log('Received ID:', id); // id 现在是数字类型
    return `Item with ID: ${id}`;
  }

  @Get(':uuid')
  getItem2(@Param('uuid', ParseUUIDPipe) uuid: string) {
    console.log('Received UUID:', uuid); // 验证通过的 UUID
    return `Item with UUID: ${uuid}`;
  }
}

// 在 NestJS 中，管道（Pipes）不仅可以使用内置的，还可以自定义， 管道也可以在根组件上注册使用 如 全局验证管道
//  DTO（Data Transfer Object，数据传输对象）是用于定义请求数据结构的类
