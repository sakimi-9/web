//导入http模块
var http = require('http');

//创建服务对象 server
var server = http.createServer((request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    //传入完整url 对URL类进行实例化
    // let url = new URL('http://localhost:9000/search?username=zs&password=123456');
    //URL类进行实例化传参时 也可以分段传入url  一个参数传请求路径  一个参数传路径/的前部分（协议+域名+端口号）
    let url = new URL(request.url, 'http://localhost:9000')
    console.log(url);
    console.log(url.searchParams.get('username'));//query变成了searchParams搜索参数  需要获取指定属性的值时要用get('属性名')
    response.end('我是响应体 hello http server');
}
)
//set server.listen（nodejs端口号，函数执行任务）
server.listen(9000, () => {
    console.log('服务启动...');
})