import { User } from './user.entity';
export declare class Tags {
    id: number;
    tags: string;
    user: User;
    toJSON(): {
        id: number;
        tags: string;
    };
}
