import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, AddTagsDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';


@ApiTags('用户管理')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // 增加tag的接口
    @Post('tags')
    @ApiOperation({ summary: '为用户添加标签' })
    @ApiResponse({ status: 201, description: '添加成功' })
    @ApiBody({ type: AddTagsDto })
    addTags(@Body() addTagsDto: { tags: string[], userId: number }) {
        return this.userService.addTags(addTagsDto);
    }

    @Post()
    @ApiOperation({ summary: '创建用户' })
    @ApiResponse({ status: 201, description: '创建成功' })
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: '获取用户列表' })
    @ApiQuery({ name: 'keyWord', required: false })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'pageSize', required: false })
    async findAll(
        @Query('keyWord') keyWord: string = '',
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
    ) {
        const result = await this.userService.findAll({ keyWord, page: +page, pageSize: +pageSize });
        return result;
    }

    @Patch(':id')
    @ApiOperation({ summary: '更新用户' })
    @ApiParam({ name: 'id', description: '用户ID' })
    update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除用户' })
    @ApiParam({ name: 'id', description: '用户ID' })
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
} 