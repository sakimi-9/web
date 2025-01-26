//运行不了，是因为文件改名，配置文件参数发生变化，从而找不到express module ，需要重新格式化工作目录与删除重装express module

//require express 框架
const express = require('express');

const fs = require('fs');
const { request } = require('http');

//express class的实例化 应用对象
const app = express();

//配置router规则

//路由参数 位置上 是 path在url里的那一部分  比如 12312.html  2232.html     
//没有进行通配的路由参数
app.get('/101.html', (request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    filePath = __dirname + '/商品详情.html';
    const html = fs.readFileSync(filePath);
    response.end(html);
})

//对路由参数进行通配 然后才能以id返回对应的页面
app.get('/:id.html', (request, response) => {  // 占位符： 拼接 字符串 .html 用这个来通配路由参数
    response.setHeader('content-type', 'text/html;charset=utf-8');
    console.log('路由参数:' + request.params.id);//params.字符串  获取路由参数
    //params 参数  request.params 请求报文的路由参数对象
    //parse 解析  url.parse url解析后的 路径信息对象
    response.end('商品详情');
})


//set 应用对象的监听函数
app.listen(3000, () => {
    console.log('服务端端口号3000,监听启动...');
})

