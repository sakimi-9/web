import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';//这里要安装@types/express 否则缺失express的.d.ts文件 没有类型声明文件就找不到支持ts的express模块

//控制器 是路由逻辑实现 的类，负责http请求处理的具体实现    路由负责在哪里实现什么    
//ts里面可以使用装饰器  Nestjs框架使用控制器时，会结合装饰器简化开发
@Controller('users') // 定义控制器的路由前缀
export class UserController {
    @Get() // 处理 GET 请求
    getAllUsers(@Res() res: Response): void {
        const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
        res.json(users);
    }

    @Post() // 处理 POST 请求
    createUser(@Body() newUser: any, @Res() res: Response): void {
        res.status(201).json(newUser);
    }
}


//控制器在路由文件里面使用 差不多是这样
import { Router } from 'express';
// import UserController from './controllers/UserController';  引入控制器

const router = Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);

export default router;
