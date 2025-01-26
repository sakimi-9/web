var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 导入router web文件
var indexRouter = require('./routes/web/index');
var authRouter = require('./routes/web/auth');

// 导入router api    account 接口文件
const accountRouter = require('./routes/api/accounts')

const mongoose = require('mongoose');

var app = express();
const { dbHost, dbPort, dbName } = require('./db(连接数据库框架)/config(url配置)');//导入url配置

//下面a b 都是跟session的导入和配置有关的  这一片(ab)代码必须要在顶层执行 也就是app.js  否则session在其他路由文件下初始化异常 导致无法正常使用session
//a 安装依赖 cnpm i mongoose connect - mongo express - session
const MongoStore = require('connect-mongo');//导入connect-mongo 结合express-sesssion连接数据库的  使用前要cnpm i mongoose
const session = require('express-session');//通过express操作session的
//b 路由使用session中间件  参数{}传入各种session配置
app.use(session({
  name: 'sid',
  saveUninitialized: false,
  secret: "qianming",
  store: MongoStore.create({
    mongoUrl: `mongodb://${dbHost}:${dbPort}/${dbName}`
  }),
  resave: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用routers 各文件
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', accountRouter);//使用account api

// 404中间件    
// 为什么url输入错误将会执行这个中间件,   
// 因为每个中间件执行之后都会执行这个404中间件, 不同的是, 其他的有对应路由的跳转, 然后有页面响应, 就不会跳转404页面, 没有对应路由的(也就是url输入错误), 就会跳转到404
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
