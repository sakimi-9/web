import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addTags(addTagsDto: {
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
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    findAll(keyWord?: string, page?: number, pageSize?: number): Promise<{
        data: import("./entities/user.entity").User[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
