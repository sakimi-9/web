//导入http模块
var http = require('http');

//创建http server
var server = http.createServer((request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    console.log(request.headers);//获取请求头 信息储存在对象里 要获取对应头名的键值对，用头名索引获取
    request.on('data', chunk => {//获取请求体 请求体的获取和流式读取的形式一样，需要事件绑定 data读取，end进行读取成功提示等
        console.log('请求体：' + chunk);
    })
    request.on('end', () => {
        console.log('请求体获取成功！');
    })
    response.end('我是响应体 hello http server ')
})

//set server.listen(nodejs端口号,匿名函数执行任务)
server.listen(9000, function () {
    console.log('开始执行任务啦...');
})