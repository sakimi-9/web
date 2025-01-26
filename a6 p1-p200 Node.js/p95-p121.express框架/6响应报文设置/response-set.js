//require express
const express = require('express');

const path = require('path');
//express class 实例化应用object
const app = express();

//配置路由规则
app.get('/response', (request, response) => {
    //响应报文设置
    //兼容http moudule原生操作
    // console.log('响应行-设置状态码：' + (response.statusCode = 404));
    // console.log('响应行-设置状态描述：' + (response.statusMessage = 'Not Found'));
    // console.log('响应头-键值对：' + (response.setHeader('content-type', 'text/html;charset=utf-8')));
    // console.log('响应体-流式写入设置：' + (response.write('mime类型与字符编码utf-8已设置<br>')));
    // console.log('响应体-一体设置：' + (response.end('你好 express框架')));

    //express API操作
    response.send('使用send自动设置了mime类型与字符编码utf-8,所有支持中文');//设置响应体 res.send() == {res.setHeader('content-type', 'text/html;charset=utf-8'),res.end()}
    response.status(200);//设置响应体-状态码，会自动匹配状态描述
    response.set('attribute', 'value');//设置响应头-键值对

});
//其他的 API 响应操作   
app.get('/bz', (request, response) => {
    response.redirect('https://www.bilibili.com')//重定向(跳转响应) 输入当前路径跳转响应其他url  
    //使用res.redirect重定向 就只能使用重定向了，不能再在该路由下设置其他东西，否则会冲突，导致重定向失效
})

app.get('/json', (request, response) => {
    response.json({
        a: 9,
        b: '6'
    });//响应json 单独响应  浏览器呈现js->json格式内容  res.json() == res.JSON.stringify()
})

app.get('/download', (request, response) => {
    response.download(__dirname + '/package.json');//下载响应
})

app.get('/sendFile', (request, response) => {
    const path_1 = path.resolve(__dirname + '/html.html');//path module 的path.resolve()拼接路径
    response.sendFile(path_1);//响应文件  非单独响应  res.sendFile() == {res.setHeader('content-type', 'text/html;charset=utf-8'),res.end(fs.readFileSync())}
})

//set app.listen
app.listen(3000, () => {
    console.log('端口号3000,监听启动...');
})