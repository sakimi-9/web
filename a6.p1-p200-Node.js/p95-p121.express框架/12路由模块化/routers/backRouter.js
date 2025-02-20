//require express
const express = require('express');

//express.Router class实例化router模块对象  router相当于一个小型的app对象
const router = express.Router();

//配置 路由模块-backRouter文件 路由规则
router.get('/', (request, response) => { //已设置路由前缀 '/' -> '/back'  之后的都会加上前缀 访问时也注意
    response.send('这里是back page');
});

router.get('/admin', (request, response) => {
    response.send('这里是admin page');
});

router.get('/setting', (request, response) => {
    response.send('这里是setting page');
});


//暴露router
module.exports = router;
