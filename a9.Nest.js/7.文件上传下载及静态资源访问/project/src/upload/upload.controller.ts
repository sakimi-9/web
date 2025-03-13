import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';


//在该控制器的指定路由下 进行 文件上传
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('album')
  @UseInterceptors(FileInterceptor('file')) // 使用拦截器处理文件上传
  upload(@UploadedFile() file) {//快速获取req中 上传的文件
    console.log(file); // 打印文件信息
    return true;
  }
}