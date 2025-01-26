//导入express框架
const express = require('express');

//创建应用对象app  app是express类的实例化
const app = express();

//设置路由  调用类实例化app的路由
app.get('/', (request, response) => {
    response.end('hello express')
})

app.get('/home', (request, response) => {
    response.end('home')
})

//设置监听函数
app.listen(3000, () => {
    console.log('服务运行，正在监听端口3000...');
})

