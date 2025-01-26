//1.安装express
//2.导入express
const express = require('express');
//虽然express框架中内嵌了cookie-parser,k但是,使用cookieParser中间件时,需要导入
const cookieParser = require('cookie-parser');//导入cookie-parser

//3.设置框架的服务对象
const app = express();

//使用cookieParser中间件(是个函数) 以获取cookie
app.use(cookieParser());

//4.配置路由 
app.get('/set-cookie', (req, res) => {  //路由模块化之后才是 router.请求方法("/url",(req,res)=>{})
    //不具有时效性  关闭浏览器会销毁本地的cookie
    // res.cookie('name', 'zhangsan');    //res.cookie('key','value',{option})
    //具有时效性   生命周期到期后才会销毁
    res.cookie('name', 'lisi', { maxAge: 100 * 1000 });   //最大生命周期 maxage 单位ms     浏览器上显示单位为s
    res.cookie('title', 'blue');   //cookie可以设置多个
    res.send('home');
});

app.get('/remove-cookie', (req, res) => {
    res.clearCookie('title');   //res.clearCookie('要删除的key')
    res.send('cookie 的 title 已经删除');
})

app.get('/get-cookie', (req, res) => {
    console.log(req.cookies);  //使用了cookieParser()中间件,所以有了这个接口 req.cookies
    res.send(`欢迎您${req.cookies.name}`);  //记得先运行一遍 /set-cookie ,让本地浏览器储存上cookie,然后才能正常获取cookie
})

//5.设置监听函数与端口号
app.listen(3000, () => {
    console.log('服务启动...');

})