import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// 使用 @Catch 装饰器指定捕获 HttpException 类型的异常
@Catch(HttpException)              //ExceptionFilter 实现此接口，表示当前类是一个 异常过滤器（本质上也是一种拦截器，用于捕获与处理异常）   
export class HttpFilter implements ExceptionFilter {
    // catch 方法是异常过滤器的核心逻辑
    catch(exception: HttpException, host: ArgumentsHost) {// ArgumentsHost 获取请求和响应的上下文

        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>(); // 获取 Request 对象
        const response = ctx.getResponse<Response>(); // 获取 Response 对象

        // 获取异常的状态码
        const status = exception.getStatus();

        // 使用 Response 对象直接返回统一的错误格式
        response.status(status).json({
            data: exception.message, // 异常信息
            time: new Date().getTime(), // 当前时间戳
            success: false, // 表示失败
            path: request.url, // 请求的 URL
            status // 状态码
        });
    }
}