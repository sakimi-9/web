// src/user/user.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll(); // 获取所有用户
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id); // 根据 ID 获取用户
  }
}