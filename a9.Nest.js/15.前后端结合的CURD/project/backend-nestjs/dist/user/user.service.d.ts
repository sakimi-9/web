import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Tags } from './entities/tags.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly tagRepository;
    constructor(userRepository: Repository<User>, tagRepository: Repository<Tags>);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: User;
    }>;
    findAll(query: {
        keyWord: string;
        page: number;
        pageSize: number;
    }): Promise<{
        data: User[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    addTags(params: {
        tags: string[];
        userId: number;
    }): Promise<{
        message: string;
        data: {
            id: number;
            name: string;
            desc: string;
            tags: {
                id: number;
                tags: string;
            }[];
        };
    }>;
}
