// common/response.ts

// 导入必要的模块
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// 定义一个泛型接口，用于指定返回数据的结构
interface Data<T> {
    data: T; // 泛型数据
}

// 使用 @Injectable 装饰器，表示这个类是一个可注入的提供者
@Injectable()
export class Response<T = any> implements NestInterceptor {// NestInterceptor：实现此接口，表示当前类是一个拦截器。
    // 实现 intercept 方法，这是拦截器的核心逻辑
    intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
        // ExecutionContext：表示当前请求的上下文，可以通过它获取请求的相关信息。
        // CallHandler：表示被拦截的函数的执行逻辑。通过调用 next.handle() 可以获取被拦截函数的返回值。

        // 使用 next.handle() 获取原始的响应数据
        // 然后通过 RxJS 的 map 操作符对数据进行格式化
        return next.handle().pipe(// Observable：在这里，next.handle() 返回的是一个 Observable。
            map(data => {
                // 将原始数据包装成统一的格式
                return {
                    data, // 原始数据
                    status: 0, // 状态码
                    success: true, // 是否成功
                    message: "牛逼" // 返回消息
                };
            })
        );
    }
}