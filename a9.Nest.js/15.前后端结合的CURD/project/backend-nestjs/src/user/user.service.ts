import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return { message: '创建成功', data: user };
    }

    async findAll(query: { keyWord: string; page: number; pageSize: number }) {
        const [data, total] = await this.userRepository.findAndCount({
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
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`ID为${id}的用户不存在`);
        }
        return { message: '删除成功' };
    }
} 