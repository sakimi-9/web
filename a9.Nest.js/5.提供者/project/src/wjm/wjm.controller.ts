import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WjmService } from './wjm.service';
import { CreateWjmDto } from './dto/create-wjm.dto';
import { UpdateWjmDto } from './dto/update-wjm.dto';



// 提供者
// 在控制器文件中 引入


@Controller('wjm')
export class WjmController {
  constructor(private wjmService: WjmService) { }  // 注入调用 WjmService

  @Get()
  getUser() {
    return this.wjmService.getUser();
  }
}