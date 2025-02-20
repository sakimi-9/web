const express = require('express');

const router = express.Router();//路由模块化

const md5 = require('md5');//导入加密依赖md5  哈希散列算法加密用户密码 

const userModel = require('../../models(各集合模型)/userModel');//导入文档封装模型

router.get('/', (req, res) => {//对默认路径重定向
    res.redirect('/account');
})

router.get('/reg', (req, res) => {//auth 认证  reg 注册
    res.render('auth/reg');//reg归档在auth下,ejs中间件向views中找时,不能直接找到reg,所以补充完整路径
});

router.post('/reg', (req, res) => {
    //表单验证

    //往数据库插入数据
    console.log(req.body)  //表单发送过去的 信息在请求体中
    userModel.create({ ...req.body, password: md5(req.body.password) })  //md5加密密码
        .catch((err) => {
            res.status(500).send('注册失败');
            return;
        })
        .then((data) => {
            res.render('success', { msg: '注册成功', url: '/login' })//注册成功->登录页面
        })
});

//登录
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    // 数据库查询 用户信息比对
    userModel.findOne({ username: username, password: md5(password) })//数据库用存的是加密后的密码,比对时,也用加密后的
        .catch((err) => {//服务器出错
            res.status(500).send('登录失败,请稍后重新登录');
            return;
        })
        .then((data) => {//findOne返回的是 查询到的data   updateOne返回的是更新信息的结果
            if (!data) {//与数据库data不符
                res.send('密码错误,请重新登录');
                return;
            } else {
                //将插入到数据库的data写入session
                req.session.username = data.username;
                req.session.password = data.password;
                // 登录成功响应
                res.render('success', { msg: '登录成功', url: '/account' })//登录成功->记账本页面
            }
        })
});

//退出登录
router.post('/logout', (req, res) => {
    req.session.destroy(() => { //销毁session  req.session.destroy(()=>{销毁后要执行的任务体})
        res.render('success', { msg: '退出成功', url: '/login' })
    })
})


module.exports = router;

