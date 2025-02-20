//用全局中间件 实现 对访问的url与IP记录
//require express module
const express = require('express');

const path = require('path');
const fs = require('fs');


//express class 实例化应用object 
const app = express();

//配置router规则
//全局中间件
var middleware_record = ((request, response, next) => {
    //公共函数
    const { url, ip } = request;
    fs.appendFileSync(path.resolve(__dirname + '/record.md'), `${url}  ${ip} \r\n`);

    //调用next()  作用：全部路由复用公共函数后，执行各自的callback
    next();
});

//应用对象 使用全局中间件
app.use(middleware_record);//上面是全局中间件的函数声明，这个才是调用

app.get('/login', (request, response) => {
    response.send('你好 login');
});

app.get('/home', (request, response) => {
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