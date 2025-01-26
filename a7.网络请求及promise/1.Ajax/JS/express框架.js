//1.导入express    package.json的"type":"module" 就是代码模块化ES写法
import express from "express";

//2.实例化框架的应用对象
const app = express();

//3.配置路由规则
app.get('/server', (request, response) => {
    //设置响应头 允许跨域请求    这样那个有ajax的html页面才能对这个http服务的页面 跨域请求   否则,ajax的默认特性不允许跨源
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.send('Hello Ajax');
});

app.all('/server', (request, response) => {
    //这三个都是CORS 跨域资源共享(常用的请求头设置)   
    //设置响应头 允许URL跨域请求(* 表示来自任何URL的)  只要跟ajax请求有关的路由,都要设置这个跨域 
    response.setHeader('Access-Control-Allow-Origin', '*');//默认只支持GET POST 要更多请求方法,设置第三个
    //设置响应头  允许自定义响应头  这样Ajax设置的自定义请求头才能生效
    response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应头  允许所有请求方法  这样Ajax设置的更多请求方法才能生效
    response.setHeader('Access-Control-Allow-Method', '*');

    response.send('Hello Ajax post');
})

app.get('/server-json-ie', (request, response) => {
    //设置跨域
    response.setHeader('Access-Control-Allow-Origin', '*');

    const data = { name: '张三' };
    response.send(JSON.stringify(data));//响应JSON  转化成JSON JSON.stringify(strdata)
});

//测试前端的延时callback 
app.get('/server-delay-ie', (request, response) => {
    setTimeout(() => {
        //设置跨域
        response.setHeader('Access-Control-Allow-Origin', '*');

        response.send('3S Delay');
    }, 3000);
})




//4.设置监听函数
app.listen(3000, () => {
    console.log('端口号3000,服务启动中...');

})