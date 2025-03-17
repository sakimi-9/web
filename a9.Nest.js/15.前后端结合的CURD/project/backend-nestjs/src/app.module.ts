import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'db_user2',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // 生产环境不建议使用
        }),
        UserModule,
    ],
})
export class AppModule { } 