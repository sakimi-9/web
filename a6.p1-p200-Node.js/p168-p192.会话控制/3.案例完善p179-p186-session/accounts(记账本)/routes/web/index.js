var express = require('express');
var router = express.Router();

//导入 shortid
const shortid = require('shortid');

//导入moment   时间处理的js库
const moment = require('moment');

//导入文档封装对象
const accountModel = require('../../models(各集合模型)/accountModel');

//导入checkLoginMiddleware 检测登录中间件   要检测登录的路由使用
let checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');
// 因为这里没有 导入与配置session中间件 所以无法正常启用session 所以 检测登录中间件里面要做session初始化


//数据库增删改查写在给对应路由配置中
//记账本的列表
router.get('/account', checkLoginMiddleware, function (req, res, next) {
  //查询数据库
  accountModel.find().sort({ time: -1 })     //.sort({属性:1/-1})   不能直接写-1/1  一定要把按照什么属性写上   否则报错还不容易查到错误
    .catch((err) => {
      //错误处理
      res.status(500).send('查询失败~~');
      return;
    })
    .then((data) => {
      //获取所有的账单信息

      res.render('list', { accounts: data, moment: moment });
    })


});

//添加记录的页面
router.get('/account/create', checkLoginMiddleware, function (req, res, next) {
  res.render('create');
});

//新增记录
router.post('/account', checkLoginMiddleware, (req, res) => {
  //插入数据库
  accountModel.create({
    ...req.body,//... 对象扩展符  把对象里面的属性全部拎到这个里面
    time: moment(req.body.time).toDate()  //属性覆盖 将time的YYYY-MM-DD格式转为date对象格式 再覆盖
  })
    .catch((err) => {
      //错误处理
      res.status(500).send('插入失败~~');
      return;
    })
    .then((data) => {
      //成功提醒
      res.render('success', { msg: '添加成功哦~~~', url: '/account' });
    })
});

//删除记录
router.get('/account/:id', checkLoginMiddleware, (req, res) => {  //delete返回的是 json形式删除的状态信息 而不是响应页面,所以delete的路由里不能有 响应或渲染页面出现
  //获取 params 的 id 参数
  let id = req.params.id;
  //数据库删除  及  防止误操作处理(ejs文件里)
  accountModel.deleteOne({ _id: id })
    .catch((err) => {
      //错误处理
      res.status(500).send('删除失败~~');
      return;
    })
    .then((data) => {
      //提醒
      res.render('success', { msg: '删除成功~~~', url: '/account' });
    })

});

module.exports = router;
