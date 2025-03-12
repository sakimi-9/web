import { Injectable } from '@nestjs/common';
import { CreateWjmDto } from './dto/create-wjm.dto';
import { UpdateWjmDto } from './dto/update-wjm.dto';



// 提供者 
// 在service文件中创建 在模块文件中引用 在控制器文件的构造器中注入调用  这是基本用法 
//还有 在模块文件中引用时 用 @Inject() 显式的指定依赖项  来自定义提供者的名称及值 
//还有工厂模式 异步模式 等等 详细看这个文档 https://kimi.moonshot.cn/chat/cv6eu4gr7lpta9rlf140


//创建一个服务类 WjmService
@Injectable()  //使用@Injectable() 标记类 为可注入的提供者 并 导出
export class WjmService {
  getUser() {
    return 'Hello, User!';
  }
}