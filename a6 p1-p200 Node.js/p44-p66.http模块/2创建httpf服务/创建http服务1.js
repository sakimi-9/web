//1 导入http模块
var http = require('http');

//2 创建server服务对象
const server = http.createServer((request, response) => {
    response.end('Hello http server');
})

//3 设置server的监听函数（nodejs端口号，箭头函数执行任务），从端口号监听到浏览器的请求，启动服务
server.listen(9001, () => {  //端口号是number，不是string
    console.log('server_监听已就绪,时刻监听浏览器的请求');
})