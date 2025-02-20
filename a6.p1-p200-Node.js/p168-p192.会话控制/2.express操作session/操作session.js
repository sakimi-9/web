//1.安装express
//2.导入express
const express = require('express');
//安装依赖 cnpm i mongoose connect-mongo express-session
const MongoStore = require('connect-mongo');//导入connect-mongo 结合express-sesssion连接数据库的  使用前要cnpm i mongoose
const session = require('express-session');//通过express操作session的

//3.设置框架的服务对象
const app = express();

app.use(session({
    name: 'sid',//设置session返回的 储存sid的cookie的name
    saveUninitialized: false,//每次请求是否都要设置session false(不接受使用session就没必要设置)
    secret: '签名加密',//设置session的加密密码 也就是'签名'
    resave: false,//每次重复请求是否刷新 session与cookie的最大生命周期
    cookie: {//设置 设置好session后 服务器返回储存sid的cookie
        httpOnly: true,//设置sid 是否 只能通过http传输获取  true(通过前端js操作获取不了sid){如:Dom树 document.sid 就获取不到sid了}
        maxAge: 1000 * 60 * 60 * 24 * 3//设置 本地浏览器cookie与服务器数据库session的最大生命周期
        //ms->s->min->h->day*n  3天的最大生命周期
    },
    //设置 连接mongodb数据库
    store: MongoStore.create({//仓库:mongo仓库.新增连接({url})
        mongoUrl: 'mongodb://127.0.0.1:27017/database-session'
    })
}))

//4.配置路由 
app.get('/login', (req, res) => {//登陆页面 设置session
    if (req.query.username === 'admin' && req.query.password === 'admin') {//查询字符串 验证成功 才能设置session
        // cookie存在客户端 由服务器结合用户信息分配  所以 cookie的设置 是res.cookie('key','value')
        // session存在服务端 由客户端发送信息验证后生成  所以 session的设置 是req.sesson.key='value
        req.session.username = 'zhangsan';
        req.session.password = '000000';
        res.send('登录成功,session设置成功');
    } else {
        res.send('登录失败');
    }
});

app.get('/cart', (req, res) => {//购物车页面 获取(验证)session
    if (req.session.username) {//验证session 登录了才返回用户的购物车页面
        res.send(`购物车页面,欢迎${req.session.username}`);
    } else {
        res.send('您还未登录~~');
    }
});

app.get('/logout', (req, res) => {//退出页面 销毁session 销毁的是本地浏览器的cookie
    与服务器数据库的session信息
    if (req.session.username) {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(`退出页面,再见${req.session.username}`);
        req.session.destroy(() => {     //销毁session req.session.destroy(()=>{销毁后要执行的任务体})
            res.end('session destroy 会话已销毁')
        })
    } else {
        res.send('您还未登录,无法进行退出操作');
    }
});


//5.设置监听函数与端口号
app.listen(3000, () => {
    console.log('服务启动...');

})