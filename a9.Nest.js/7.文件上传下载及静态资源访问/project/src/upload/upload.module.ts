import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';//MulterModule是express中处理文件上传的模块
import { diskStorage } from 'multer';//引入 multer 中 文件储存引擎diskStorage
import { extname, join } from 'path';//extname 文件扩展名


//上传下载 静态资源 的文件结构说明
//上传下载 是子模块  nest g resource upload / download
//静态资源 存放单独的文件夹  如图片 public/image

@Module({
  imports: [MulterModule.register({//引入文件上传模块并进行配置
    storage: diskStorage({//使用 文件储存引擎diskStorage
      destination: join(process.cwd(), "public/images"), // 设置文件存放目录    使用process.cwd()文件根目录  避免环境混淆 src下 还是 dist下
      filename: (_, file, callback) => { // 用于自定义文件名。
        // 这里用当前时间戳加上文件的原始扩展名（如 .jpg、.png）来生成文件名，避免文件名冲突 
        const fileName = `${new Date().getTime()}${extname(file.originalname)}`;
        return callback(null, fileName);
      }
    })
  })],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }