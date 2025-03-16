import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


//使用守卫决定请求是否可以被路由程序处理
import { Post, UseGuards } from '@nestjs/common';
import { CommonGuard } from './Guard/common.guard';//引入寻常守卫
import { Role, RoleGuard } from './Guard/role.guard';

@Controller('guard')
@UseGuards(CommonGuard) // 使用 CommonGuard 守卫
export class CommonGuardController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}


@Controller('guard')  //在实际项目中，你需要根据你的认证机制（如 JWT）来适配如何获取用户信息和角色
@SetMetadata('role', ['admin']) // 第一个参数为key，第二个参数是可放行的角色数组
export class RoleGuardController {
  constructor(private readonly appService: AppService) { }

  @Get('admin')
  @Role('admin') // 设置只有 admin 角色的路由会被角色守卫进行守卫操作, 角色守卫那边设置的业务逻辑是有权限的才放行访问
  getHello(): string {
    console.log('是个有权限的角色，放行 ');
    return 'Hello Admin!';
  }

  @Get('user')
  @Role('user') //user 角色无权限不能继续访问
  getHello1(): string {
    console.log('无权限，禁止访问');
    return this.appService.getHello();
  }
}
