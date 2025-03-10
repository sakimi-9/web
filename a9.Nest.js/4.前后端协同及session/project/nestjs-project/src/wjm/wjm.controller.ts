import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { WjmService } from './wjm.service';
import { CreateWjmDto } from './dto/create-wjm.dto';
import { UpdateWjmDto } from './dto/update-wjm.dto';


import * as svgCaptcha from 'svg-captcha';//验证码依赖

@Controller('wjm')
export class WjmController {
  constructor(private readonly wjmService: WjmService) { }

  @Post()
  create(@Body() createWjmDto: CreateWjmDto) {
    return this.wjmService.create(createWjmDto);
  }

  @Get()
  findAll() {
    return this.wjmService.findAll();
  }
  @Get('code')
  createCode(@Req() req, @Res() res) {
    const Captcha = svgCaptcha.create({
      size: 4,//生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      background: '#cc9966',  //背景颜色
    })
    req.session.code = Captcha.text;
    return res.type('image/svg+xml').send(Captcha);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wjmService.findOne(+id);
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
