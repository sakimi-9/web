import { Controller, Get, Post, Body, Patch, Param, Delete, Version } from '@nestjs/common';
import { WjmService } from './wjm.service';
import { CreateWjmDto } from './dto/create-wjm.dto';
import { UpdateWjmDto } from './dto/update-wjm.dto';

@Controller({
  path: 'wjm',
  version: '3'
})
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

  //路由级的 版本控制 版本也是前缀  紧挨着根路径后面
  @Version('1')
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
