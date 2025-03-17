import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: '用户名称', example: '张三' })
    @IsNotEmpty({ message: '名称不能为空' })
    @IsString({ message: '名称必须是字符串' })
    @Length(2, 20, { message: '名称长度必须在2-20个字符之间' })
    name: string;

    @ApiProperty({ description: '用户描述', example: '这是一个用户描述' })
    @IsNotEmpty({ message: '描述不能为空' })
    @IsString({ message: '描述必须是字符串' })
    desc: string;
} 