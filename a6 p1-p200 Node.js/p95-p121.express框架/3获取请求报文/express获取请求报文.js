//require express 框架
const express = require('express');

//express类实例化应用对象
const app = express();

//配置router规则
app.get('/request', (req, res) => {
    //兼容http module 原生操作
    console.log('请求方法：' + req.method);
    console.log('请求路径：' + req.url);//request.url的这个请求路径，是协议主机号端口号之后的所有内容，包括查询字符串参数
    console.log('协议版本号：' + req.httpVersion);
    console.log('请求头：' + req.headers);//请求头是 headers 别打错了

    //express操作 由框架提供的api
    console.log('express获取路径:' + req.path);//express提供的path api这个路径，就只是路径，跟请求路径相比，没有查询字符串参数
    console.log('express获取查询字符串参数' + req.query.a);//req.query 获取的是对象为元素的数组,可用对象索引方式读取
    console.log('express获取局域网内访问端ip' + req.ip);//http://本机局域网IP地址：端口号/request/？a=1  要用同一局域网下设备访问才有效
    //命令行 ipconfig 查询IP信息  本机局域网IP（WLAN ipv4那个）为10.11.240.162

    res.end('hello response');
})

//set应用对象的监听函数
app.listen(3001, () => {
    console.log('express框架监听启动...');
})