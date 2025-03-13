import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing';  // 引入 compressing 库用于压缩文件

//在该控制器的指定路由下 进行 文件上传
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  //文件上传的接口
  @Post('album')
  @UseInterceptors(FileInterceptor('file')) // 使用拦截器处理文件上传
  upload(@UploadedFile() file) {//快速获取req中 上传的文件
    console.log(file); // 打印文件信息
    return true;
  }

  // 直接下载文件的接口   适合单个文件的下载
  @Get('export')
  downLoad(@Res() res: Response) {  // 使用 @Res() 注解获取 Express 的 Response 对象
    const url = join(process.cwd(), 'public/images/20230502180024_a42d4.jpeg');  // 文件路径
    res.download(url);  // 使用 Response 对象的 download 方法直接下载文件
  }


  //流式下载文件的接口   适合多个文件的下载或动态生成的文件
  @Get('stream')
  async down(@Res() res: Response) {
    // 定义要压缩的文件列表
    const files = [
      join(process.cwd(), 'public/images/sea-9455144_1280.webp'),
      join(process.cwd(), 'public/images/20230502180024_a42d4.jpeg')
    ];


    const zipStream = new zip.Stream();  // 创建一个 ZIP 文件流
    // 遍历文件列表，将每个文件添加到 ZIP 包中
    for (const file of files) {
      await zipStream.addEntry(file);
    }
    // 设置 HTTP 响应头
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=yaosbao.zip`);

    // 将 ZIP 文件流发送到客户端
    zipStream.pipe(res);
  }
}