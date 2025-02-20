/**
 * 按照要求搭建 HTTP 服务
 * 
 * GET   /login  显示表单网页
 * POST  /login  获取表单中的『用户名』和『密码』
 * 
 * http module 原生操作获取请求体，是进行事件绑定获取 
 * req.on('data',chunk=>{}),req.on('end',()=>{}),data接收req-body ,end继续接收成功提示 
 */
//require express module
const express = require('express');

const bodyParser = require('body-parser');//导入 外部安装的 请求体解析器

const path = require('path');

//express class 实例化应用object
const app = express();

//配置router规则

// http module 原生操作 通过事件绑定获取 resquest body
// app.all('/login', (request, response) => {
//     const path_form = path.resolve(__dirname + '/form.html');
//     response.sendFile(path_form);
//     request.on('data', chunk => {
//         console.log('request-body:' + chunk);
//     });//切记，表单控件，输入框这种，一定要写好 name属性，否则，获取请求体时，读取不到数据，因为键值对对应不上
//     request.on('end', () => {
//         console.log('请求体获取成功!');
//     });
//     response.send('已获取')
// });

//中间件 bodyParser 请求体解析器 获取请求体
//获取 queryString (js)格式的请求体
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//获取 json 格式的请求体
// const jsonParser = bodyParser.json();//获取 json 格式请求体，不用时 要注释掉 或者 干脆不写，否则会导致报错

app.get('/login', (request, response) => {
    const path_form = path.resolve(__dirname + '/form.html');
    response.sendFile(path_form);
})

app.post('/login', urlencodedParser, (request, response) => {
    console.log('请求体：' +
        `username:${request.body.username}
        password:${request.body.password}`
    );
    response.send('已获取请求体');
})


app.all('*', (request, response) => {
    response.status(404);
    response.end(`<h1>Not Found</h1>`);
})


//set app.listen
app.listen(3000, () => {
    console.log('端口3000,服务启动...');
})