var express = require('express');
const { formidable } = require('formidable');
//formidable 版本更新之后，不再是一个函数了，变成了对象，所以要用对象解构赋值来导入

// import formidable from 'formidable';  ES的写法要改成上面CommJS的写法，否则不兼容
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//显示网页（表单）
router.get('/portrait', (req, res) => {  //注意路径名称别打错了
  res.render('portrait');  //注意渲染的文件名称别打错了  否则访问不到，如果都打对了还是访问不到，那就重启服务
});

//处理文件上传
router.post('/portrait', (req, res) => {
  //formidable的路由-文件处理 代码 这个拿着复用
  //创建form对象  文件通过form上传的form
  const form = formidable({
    //设置 允许多个文件上传
    multiples: true,
    //设置 文件上传保存在的文件夹       这个和下个都是为了 访问资源url 可以访问到资源的必须设置
    uploadDir: __dirname + '/../public/images',
    //设置 保持文件扩展名
    keepExtensions: true
  });
  //解析请求报文  文件上传的请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // res.json({ fields, files });  单独响应 与 res.end()同性质
    //直接打印出，更直观的查看 fields 与 files
    //fileds 存储一般数据  input type='text/password/select(选项列表框)/checkbox(多选框)/radio(单选框)'
    //files 存储文件数据  input type='filem'
    console.log(fields);
    console.log(files);
    console.log(files['portrait-file'][0].newFilename);//图片url 要变成资源访问url（可通过静态资源服务访问的url） 还要拼接 访问该资源的子路径 
    //获取对象里的属性值有两种方法，一种是用.索引： 对象.属性名 ，另一种是用[]索引：  对象[属性名]
    //像属性名为字符串形式时，只能用第二种获取，如：object['file'][0].newFilename  属性名为字符串，值又为数组，数组元素又为对象

    //服务器保存该图片的访问url  -> 服务器静态资源目录下该资源类型下的资源位置  ， 静态资源中间件已设置static目录为‘pubulic’  ,所以设置资源访问url时，图片url前面 要拼接上 ‘/images/'
    // 保存之后用户才能通过url查看到设置的图片，将来会把这个存在数据库中
    let file_url = '/images/' + files['portrait-file'][0].newFilename;//前面是 访问该资源的子路径 
    console.log(file_url);

    res.send(`图片已存入静态资源目录的images下
      访问资源url:${file_url}`);
  });
});
//上传文件成功后，要查看完整报文，得用Fiddler ,浏览器的载荷里看不到二进制数据

module.exports = router;
