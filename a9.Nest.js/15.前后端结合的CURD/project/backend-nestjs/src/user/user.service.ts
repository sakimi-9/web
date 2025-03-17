import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Tags } from './entities/tags.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Tags)
        private readonly tagRepository: Repository<Tags>
    ) { }

    async create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return { message: '创建成功', data: user };
    }

    async findAll(query: { keyWord: string; page: number; pageSize: number }) {
        const [data, total] = await this.userRepository.findAndCount({
            relations: ['tags'],
            where: {
                name: Like(`%${query.keyWord}%`),
            },
            order: {
                id: 'DESC',
            },
            skip: (query.page - 1) * query.pageSize,
            take: query.pageSize,
        });

        return {
            data,
            total,
            page: query.page,
            pageSize: query.pageSize,
        };
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`ID为${id}的用户不存在`);
        }

        await this.userRepository.update(id, updateUserDto);
        return { message: '更新成功' };
    }

    async remove(id: number) {
        // 先查找用户
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['tags']
        });

        if (!user) {
            throw new NotFoundException(`ID为${id}的用户不存在`);
        }

        // 如果有标签，先删除标签
        if (user.tags && user.tags.length > 0) {
            // 删除所有关联的标签
            await this.tagRepository.remove(user.tags);
        }

        // 然后删除用户
        await this.userRepository.remove(user);
        return { message: '删除成功' };
    }

    async addTags(params: { tags: string[]; userId: number }) {
        const userInfo = await this.userRepository.findOne({
            where: { id: params.userId },
            relations: ['tags']
        });

        if (!userInfo) {
            throw new NotFoundException(`ID为${params.userId}的用户不存在`);
        }

        // 获取用户现有的标签
        const existingTags = userInfo.tags || [];
        const existingTagValues = existingTags.map(tag => tag.tags);

        const tagList: Tags[] = [];

        // 只添加不存在的标签
        for (const tagValue of params.tags) {
            // 检查标签是否已存在
            if (!existingTagValues.includes(tagValue)) {
                let tag = new Tags();
                tag.tags = tagValue;
                tag.user = userInfo;
                await this.tagRepository.save(tag);
                tagList.push(tag);
            }
        }

        // 如果没有新标签被添加，返回提示
        if (tagList.length === 0) {
            return {
                message: '没有新标签被添加，标签可能已存在',
                data: {
                    id: userInfo.id,
                    name: userInfo.name,
                    desc: userInfo.desc,
                    tags: existingTags.map(tag => ({
                        id: tag.id,
                        tags: tag.tags
                    }))
                }
            };
        }

        // 返回简化的结果，避免循环引用
        return {
            message: '标签添加成功',
            data: {
                id: userInfo.id,
                name: userInfo.name,
                desc: userInfo.desc,
                tags: [...existingTags, ...tagList].map(tag => ({
                    id: tag.id,
                    tags: tag.tags
                }))
            }
        };
    }
} 