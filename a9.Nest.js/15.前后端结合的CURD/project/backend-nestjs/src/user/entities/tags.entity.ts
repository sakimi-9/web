import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, Generated, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './user.entity'
import { Exclude } from 'class-transformer';

@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tags: string

    @ManyToOne(() => User, (user) => user.tags)
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    user: User

    //     OneToMany 和 ManyToOne的用法

    // 对于用户来说一个用户可以拥有多个tag 他们的关系是一对多 OneToMany

    // 对于tag来说他们是多个tag指定单个用户 所以是  ManyToOne

    // 自定义 toJSON 方法，避免循环引用
    toJSON() {
        return {
            id: this.id,
            tags: this.tags
        };
    }
} 