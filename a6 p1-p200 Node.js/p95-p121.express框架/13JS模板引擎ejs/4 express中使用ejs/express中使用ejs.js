//require express module
const express = require('express');

const path = require('path');

//在express框架中使用 ejs 不需要导入
//而是分三步使用 ejs 1.设置模板引擎 2.设置模板文件路径 3.路由中 响应.渲染

//express class 实例化应用object 
const app = express();

//配置router规则
//1.设置模板引擎 配合express框架的模板引擎有多个，所以设置其中一个 ejs
app.set('view engine', 'ejs');//view engine 模板引擎 view也有模板的意思
//2.设置模板文件路径 含ejs模板语法(那三个标识)的文件夹的存放路径  注意： views里面的文件，文件扩展名必须为.ejs  否则识别不到
let path_1 = path.resolve(__dirname + '/views');
app.set('views', path_1);

app.get('/', (request, response) => {
    let title = '<h3>我是标题</h3>';
    //3.路由中  响应.渲染  res.render('文件名',{数据})   注意： 与res.end()同性质，有且只能有一个，否则冲突
    response.render('index.ejs', { title });//文件名写不写.ejs扩展名都可以
    // response.send('你好 home');
});

app.all('*', (request, response) => {
    response.status(404);
    response.end(`<h1>Not Found</h1>`);
})

//set app.listen
app.listen(3000, () => {
    console.log('端口3000,服务启动...');
})