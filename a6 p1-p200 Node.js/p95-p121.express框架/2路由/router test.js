//导入express框架模块
const express = require('express');

//创建应用对象，express类的实例化
const app = express();

//配置路由规则

//method为get时

//默认路径
app.get('/', (request, response) => {
    response.end('hello express ');
});

//主页
app.get('/home', (request, response) => {
    response.end('home');
});

//其他页面 如 login页
app.get('/login', (request, response) => {
    response.end('login');
});

//其他非法页面 自定义404页面
app.get('*', (request, response) => {
    response.statusCode = 404;
    response.end('404 NOt Found');
});


//method为post时
app.post('/post-test', (request, response) => {
    response.end("post-test");
});


//匹配所有方法，method为任意都行时
app.all('/search?', (req, res) => {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end('搜索结果为:')
})

//路由监听函数
app.listen(3000, () => {
    console.log('服务启动，正在监听3000端口...');
})