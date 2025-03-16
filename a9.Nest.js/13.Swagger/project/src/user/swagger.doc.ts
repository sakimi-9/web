// src/user/swagger.doc.ts    
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageConfig from '../../package.json';

//接口文档的生成逻辑
export const generateDocument = (app) => {
    const { name, description, version } = packageConfig;
    const options = new DocumentBuilder() // 构建文档的基本信息
        .setTitle(name) // 设置文档标题
        .setDescription(description) // 设置文档描述
        .setVersion(version) // 设置文档版本
        .addBearerAuth() // 添加 Bearer Token 认证
        .build();

    const document = SwaggerModule.createDocument(app, options); // 创建文档
    SwaggerModule.setup('/api/doc', app, document); // 设置文档访问路径
};