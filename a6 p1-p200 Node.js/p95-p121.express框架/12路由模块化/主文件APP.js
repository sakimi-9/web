//reuqire express
const express = require('express');

//导入中间件与router modules
const fangdaolian = require('./全局中间件/防盗链');

const frontRouter = require('./routers/frontRouter');
const backRouter = require('./routers/backRouter');
const qtRouter = require('./routers/其他非法路径');

//express class实例化app 对象
const app = express();

//配置主文件路由规则  app.use(),可以应用全局中间件与路由模块
app.use(fangdaolian);//应用全局中间件-防盗链
//应用路由模块  app.use(（'路径前缀'，）路由名称)
//应用路由模块时   也可以设置路由模块的路径前缀 '/ues'  那么接下来该路由的路径 '/' -> '/use' == '/use/'   '/login' -> '/use/login'
app.use('/front', frontRouter);
app.use('/back', backRouter);
app.use(qtRouter);

//set app.listen
app.listen(3000, () => {
    console.log('端口3000,服务启动...');
})