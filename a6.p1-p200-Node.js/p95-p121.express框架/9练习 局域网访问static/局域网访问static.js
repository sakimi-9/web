//require express
const express = require('express');

//express class 实例化app object
const app = express();

//middleware-static
app.use(express.static(__dirname + '/public'));
//局域网本机IP：10.11.224.101
//访问地址：http://10.11.224.101:3000

//配置路由规则
app.get('/home', (request, response) => {
    response.send('这里是home view');
});

app.all('*', (request, response) => {
    response.status(404);
    response.send('<h1>404 Not Found</h1>');
})

//set app.listen
app.listen(3000, () => {
    console.log('端口3000,服务启动...');
})