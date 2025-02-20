//require express module
const express = require('express');
const { url } = require('inspector');

const path = require('path');

//express class 实例化应用object 
const app = express();

//防盗链
//作用：防止其他网站盗用本网站资源
//逻辑：访问时，只有本网站的域名才会返回资源，其他域名访问资源时会报错或者不响应资源
//如何实现：写个全局中间件，判断请求报文的referer(引用者，网站url)里的hostname是否==本网站url的hostname
//网站url可能不是referer 而是 host,具体看网站或者控制台打印的req.headers 请求头对象
// 为 host 时，要将路径的协议补充上，new URL('http://' + host) ，否则URL对象里的hostname为空

const fangdaolian = (request, response, next) => {
    let { host } = request.headers;//let host=request.get('host') 用get获取请求头指定属性的值 效果一样
    console.log(host);

    let url = new URL('http://' + host);//这里网站url不是referer而是host,所以注意 new URL()时，拼接好协议
    console.log(url);

    let { hostname } = url;

    if (hostname == '127.0.0.1') {
        next();//符合判断条件的，后续路由和静态资源中间件 才能复用公共函数，这里是 才可以正常返回到资源
    } else {
        response.status(404);
        response.send('<h1>404 Not Found</h1>');
        return;//不符合的 代码停止，资源返回不到
    }

}

app.use(fangdaolian);
//静态资源中间件  参数里放的是 静态资源文件夹(目录)路径，不是具体文件路径！
app.use(express.static(__dirname + '/public'));
//配置router规则

app.all('*', (request, response) => {
    response.status(404);
    response.end(`<h1>Not Found</h1>`);
})


//set app.listen
app.listen(3000, () => {
    console.log('端口3000,服务启动...');
})