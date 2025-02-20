var express = require('express');
var router = express.Router();

//导入 shortid
const shortid = require('shortid');

//导入moment   时间处理的js库
const moment = require('moment');

//导入文档封装对象
const accountModel = require('../../models(各集合模型)/accountModel');
//数据库增删改查写在给对应路由配置中


//记账本的列表
router.get('/account', function (req, res, next) {
    //查询数据库->获取账单信息
    accountModel.find().sort({ time: -1 })     //.sort({属性:1/-1})   不能直接写-1/1  一定要把按照什么属性写上   否则报错还不容易查到错误
        .catch((err) => {
            //错误处理
            res.json({
                code: '1001',
                msg: '获取失败',            //message 信息
                data: null                //获取失败不给数据,赋值为null
            })
            return;
        })
        .then((data) => {
            //获取所有的账单信息并响应|v
            // api接口返回的json格式的信息  一般以下面这种格式写的     后端通过api接口给前端返回json格式的数据,前端运用数据
            res.json({
                //响应编码
                code: '0000',    //"0000"或者"000000","20000" ,字符串的四个0或者2万来代表 成功 其他非0的代表 失败  写了响应编码就不用写响应状态码了,作用一样
                //响应信息
                msg: '获取成功',  //结果提示
                //响应数据
                data: data
            })

        })
});

// 获取单个记录
router.get('/account/:id', (req, res) => {
    let id = req.params.id;//获取id
    accountModel.findById(id).catch((err) => [
        res.json({
            code: '1005',
            msg: '获取失败',
            data: null
        })
    ]).then((data) => {
        res.json({
            code: '0000',
            msg: '获取成功',
            data: data
        })
    })
});


//新增记录
router.post('/account', (req, res) => {
    //插入数据库
    accountModel.create({
        ...req.body,//... 对象扩展符  把对象里面的属性全部拎到这个里面
        time: moment(req.body.time).toDate()  //属性覆盖 将time的YYYY-MM-DD格式转为date对象格式 再覆盖
    })
        .catch((err) => {
            //错误处理
            res.json({
                code: '1002',//响应编码
                msg: '插入失败',//响应信息
                data: null//响应数据
            })
            return;
        })
        .then((data) => {
            //成功提醒
            res.json({
                code: '0000',
                msg: '插入成功',
                data: data
            })

        })
});

//删除记录
router.delete('/account/:id', (req, res) => {  //接口api 的删除-路由 记得把请求方法post->delete
    //获取 params 的 id 参数
    let id = req.params.id;
    //数据库删除  及  防止误操作处理(ejs文件里)
    accountModel.deleteOne({ _id: id })
        .catch((err) => {
            //错误处理
            res.json({
                code: '1004',
                msg: '删除失败',
                data: null
            })
            return;
        })
        .then((data) => {
            //提醒
            res.json({
                code: '0000',
                msg: '删除成功',
                data: {}    //删除的 响应数据 值 可以写成null 或者 {}
            })
        })

});

// 更新单个记录
router.patch('/account/:id', (req, res) => {
    let { id } = req.params;//下面筛选属性要写成_id,否则识别不到   mongoose自动维护id的属性也是_id
    accountModel.updateOne({ _id: id }, req.body)   //因为model.updateOne的data所返回的值是更新结果信息并不是更新后的文档
        .catch((err) => {
            res.json({
                code: '1006',
                msg: '更新失败',
                data: null
            })
        })
        .then((data) => {  //所以,要在嵌套一层,以获得更新的文档信息
            accountModel.findById(id).
                catch((err) => {
                    res.json({
                        code: '1005',
                        msg: '获取失败',
                        data: null
                    })
                }).
                then((data) => {
                    res.json({
                        code: '0000',
                        msg: '更新成功',
                        data: data
                    })
                })
        })
})

module.exports = router;
