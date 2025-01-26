//require express
const express = require('express');

//express.Router class实例化router模块对象  router相当于一个小型的app对象
const router = express.Router();

//配置 路由模块-其他非法路径文件 路由规则
router.all('*', (request, response) => {
    response.status(404);
    response.send('<h1>404 Not Found</h1>');
});

//暴露router
module.exports = router;
