// src/user/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';


//实体类是定义数据库表结构的类，typeORM可以根据实体类生成对应结构的数据库表
//实体类内部的 属性 通过列装饰器工厂与传入列选项 的装饰 精确映射成 数据库表的列(也就是 字段)

@Entity() // 标识这是一个实体类    
// 连通数据库之后，这些列会在数据库表（表名是实体类的名称）中自动创建，但通过前端访问时看不到数据（除非定义列的默认值），是因为还没有该字段赋值的，  有的数据库可视化插件可以看到未赋值的字段名
export class User {
    @PrimaryGeneratedColumn() // 自增主键
    id: number;

    @Column() // 字段
    nickName: string;
    @Column({ unique: true }) // 唯一约束
    email: string;

    @Column({ nullable: true }) // 可选字段
    middleName?: string;

    @Column({
        type: 'enum',
        enum: ['admin', 'user', 'guest'],
        default: 'guest',
    })
    role: string;

    @Column({ default: true }) // 默认值
    isActive: boolean;

    @Column('json') // JSON 类型
    settings: any;

    @CreateDateColumn() // 自动记录创建时间
    createdAt: Date;

    @UpdateDateColumn() // 自动记录更新时间
    updatedAt: Date;

    @Column('date') // 日期类型
    birthDate: Date;
}


