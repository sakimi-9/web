import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { SetMetadata } from '@nestjs/common';


// 使用 SetMetadata 装饰器为路由设置角色权限
export const ROLES_KEY = 'role'; // 定义一个角色的键
export const Role = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);


@Injectable()// RoleGuard 角色守卫，将针对路由的角色来进行守卫操作 在实际项目中，你需要根据你的认证机制（如 JWT）来适配如何获取用户信息和角色
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // 从 SetMetadata 中获取角色权限
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();

    // 检查请求中的角色是否在允许的列表中
    if (roles && roles.includes(request.query.role as string)) {

      return true;
    } else {

      return false;
    }
  }
}

