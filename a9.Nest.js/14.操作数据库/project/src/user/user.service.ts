// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(              //构造器不止可以在控制器的类中使用(这是最常见的使用方式)  而是 只要是类就能通过构造器使用提供者（模块上注册了就行） 
    @InjectRepository(User) // 注入 User 实体的 Repository   操作数据库的提供者
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find(); // 查询所有用户
  }
  //泛型为User 有点问题，先使用安全温和的any->unknow
  async findOne(id: number): Promise<unknown> {
    return this.userRepository.findOneBy({ id }); // 根据 ID 查询用户
  }

}