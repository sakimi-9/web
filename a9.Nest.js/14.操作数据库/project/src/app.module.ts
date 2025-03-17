import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//TypeORM 对象关系映射器 对象是实体类的实例 关系是实例之间的关系（一对一 一对多 多对一 多对多） 


@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({  //引入并配置数据库的连接 模块
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库地址
      port: 3306, // 数据库端口
      username: 'root', // 数据库用户名
      password: '123456', // 数据库密码
      database: 'db_user1', // 数据库名称  不要连 MySQL自带的数据库，那是配合MySQL服务器运行的数据库文件
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体类路径
      autoLoadEntities: true, // 自动加载实体类
      synchronize: true, // 自动同步数据库结构（开发环境使用）
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
