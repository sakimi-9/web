// 引入所需模块
const express = require('express');
// const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

// 创建 Express 应用
const app = express();
const port = 3001;

// 创建 json-server 路由
// const router = jsonServer.router(path.join(__dirname, 'db.json'));
// const middlewares = jsonServer.defaults();

// 使用中间件
app.use(cors()); // 启用 CORS
app.use(express.json()); // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码的请求体

// 使用 json-server 中间件
// app.use('/api', middlewares);
// app.use('/api', router);

// 基本路由示例
app.get('/', (req, res) => {
    res.send('Express 服务器运行中');
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
