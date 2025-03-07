import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Headers, HttpCode } from '@nestjs/common';
import { WjmService } from './wjm.service';
import { CreateWjmDto } from './dto/create-wjm.dto';
import { UpdateWjmDto } from './dto/update-wjm.dto';
import { log } from 'node:console';

@Controller('wjm')
export class WjmController {
  constructor(private readonly wjmService: WjmService) { }

  @Post('post')
  create(@Body('gender') body) {  //@Body() 可直接获取req中body  ('gender')传入参数可限制赋值给body的返回值
    console.log(body);            //就不用 body.gender

    return {
      code: 200,
      message: 'success',
      data: body
    };
  }

  @Get('get')
  @HttpCode(202)   //@HttpCode(code) 设置该路由返回状态码，必须传参
  findAll(@Request() req) {  //@Query() query 可直接获取req中字符串参数,就不用 @Request() req.query

    console.log(req.query);

    return {
      code: req.code,
      message: 'success',
      data: req.query
    };
  }

  @Get('get/:id')   //动态路由 路径参数中id是动态的，:id 是占位符  
  findOne(@Param('id') id, @Headers() headers) {  //@Param() 可直接获取req中路径参数  @Headers() 可直接获取req中请求头
    console.log(id, '\r\n', headers);
    return {
      code: 200,
      message: 'success',
      data: {
        id,
        headers
      }
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWjmDto: UpdateWjmDto) {
    return this.wjmService.update(+id, updateWjmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wjmService.remove(+id);
  }
}
