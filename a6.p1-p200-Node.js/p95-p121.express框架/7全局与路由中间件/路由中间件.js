//用路由中间件 实现 对指定路由进行判断，要求url携带code=521,否则提示【暗号错误】
//require express module
const express = require('express');

const path = require('path');

//express class 实例化应用object 
const app = express();

//配置router规则
//路由中间件
var middleware_if = ((request, response, next) => {
    //公共函数
    if (request.query.code === '521') {
        //调用next()  作用: 受约束的路由执行callback
        next();
    } else {
        response.send('暗号错误');
    }
});

//受约束路由 使用路由中间件,函数名写在路径后面，callback前面
app.get('/login', middleware_if, (request, response) => {
    response.send('你好 login');
});

app.get('/home', middleware_if, (request, response) => {
    response.send('你好 home');
});

app.all('*', (request, response) => {
    response.status(404);
    response.end(`<h1>Not Found</h1>`);
})


//set app.listen
app.listen(3000, () => {
    console.log('端口3000,服务启动...');
})