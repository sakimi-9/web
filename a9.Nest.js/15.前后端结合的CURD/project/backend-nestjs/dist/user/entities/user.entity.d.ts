import { Tags } from './tags.entity';
export declare class User {
    id: number;
    name: string;
    desc: string;
    uuid: string;
    createTime: Date;
    tags: Tags[];
    toJSON(): this;
}
