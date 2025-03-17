import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, Generated, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { Tags } from './tags.entity'
import { Exclude, classToPlain } from 'class-transformer'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 255 })
    name: string

    @Column({ type: "text" })
    desc: string

    @Generated('uuid')
    uuid: string

    @CreateDateColumn({ type: "timestamp" })
    createTime: Date

    @OneToMany(() => Tags, (tag) => tag.user, { cascade: true })
    tags: Tags[]
    //     OneToMany 和 ManyToOne的用法

    // 对于用户来说一个用户可以拥有多个tag 他们的关系是一对多 OneToMany

    // 对于tag来说他们是多个tag指定单个用户 所以是  ManyToOne

    // 自定义 toJSON 方法，避免循环引用
    toJSON() {
        const user = { ...this }
        if (user.tags) {
            user.tags = user.tags.map(tag => {
                return {
                    id: tag.id,
                    tags: tag.tags
                } as Tags;
            })
        }
        return user
    }
}