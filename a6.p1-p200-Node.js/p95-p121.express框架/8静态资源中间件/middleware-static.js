//require express module
const express = require('express');

const path = require('path');

//express class 实例化应用object 
const app = express();

//配置router规则
//静态资源中间件
app.use(express.static(__dirname + '/public'));//params 参数为 静态资源目录（网站根目录[路径为/，也就是直接访问，会默认显示那些静态资源]），也可以输入静态资源路径访问 

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