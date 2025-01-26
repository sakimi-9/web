var express = require('express');
var router = express.Router();


//导入 lowdb
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname + '/../data/db.json');//别忘了改文件写入路径
//获取 db 对象
const db = lowdb(adapter);

const shortid = require('shortid');//require shortid

const { formidable } = require('formidable');

//记账本列表 表单页面
router.get('/account', (req, res) => {
  res.render('index', {});//响应.渲染 记账本页面
});

//添加记录  文件及数据上传处理
router.post('/account/create', (req, res) => { //路由路径前面那一 / 别忘了,不然一直 not found
  //formidable的路由-文件处理 代码 这个拿着复用
  //创建form对象 文件通过form上传的form
  const form = formidable({

    //设置 允许多个文件上传
    multiples: true,

    //设置 文件上传保存在的文件夹 这个和下个都是为了 访问资源url 可以访问到资源的必须设置
    uploadDir: __dirname + '/../public/images',

    //设置 保持文件扩展名
    keepExtensions: true
  });

  //解析请求报文 文件上传的请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(fields);
    console.log(files);
    console.log(req.bodey);//res.body 结果为空 因为formidable与body-parser功能上冲突
    // 当 formidable 完成解析后，请求体的内容已经被消费掉了，所以 body - parser 在后续尝试解析时将无法获取任何数据

    //生成id
    let id = shortid.generate();
    //写入文件 将id与数据对象元素合并
    db.get('account').push({ id: id, ...fields }).write();

    //打印账单
    let data = db.get('account').value();
    console.log(data);

    res.render('res.ejs', { fields, id })
  });
});

//删除对应id 账单  进到这个路由就会执行删除操作  所以页面用a标签绑定删除按钮就行
router.get('/account/:id', (req, res) => {
  //获取 params的id参数   req.params 解析路由的路径
  let id = req.params.id;
  //删除
  db.get('account').remove({ id: id }).write();
  //提醒
  res.send('<h2>删除成功</h2>')
});

module.exports = router;
