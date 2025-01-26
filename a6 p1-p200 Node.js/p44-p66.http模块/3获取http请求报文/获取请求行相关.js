//导入http模块 url模块
const { log } = require('console');
var http = require('http');
var url = require('url');

//创建http server
var server = http.createServer((request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');//设置响应头 支持中文与html语法
    console.log('request.method:' + request.method);//获取请求行的请求方法 这是属性
    // 打印了两个请求方法，还有一个是favicon请求报文的，其他获取因此也会多一份出来
    console.log('httpVersion:' + request.httpVersion);//获取请求行的版本号
    console.log(request.url);//request.url只能获取url路径部分，前面的域名等等看不到，所以这是获取请求行的路径
    let url_parse_object = url.parse(request.url, true);
    console.log('url object:', url_parse_object);//获取url模块后，使用parse解析请求路径，返回储存url信息的对象
    console.log('url路径：' + url_parse_object.pathname,//获取url路径解析的pathname路径名 
        //pathname是url对象里的路径名！= request.url是url路径部分
        '也就是请求路径？：', Boolean(url_parse_object.pathname == request.url));
    console.log('对象形式的query:', url.parse(request.url, true).query);//获取url路径parse解析的query查询 字符串参数 
    //parse第二个参数为true query返回对象形式 注意对象形式时，log的输出连接符只能用，号，不能用+号
    //parse没填第二个参数 query返回字符串形式
    console.log('字符串形式的query:', url.parse(request.url).query);//query查询 字符串参数  
    console.log('object query时返回指定键值对username的值:', url_parse_object.query.username);
    response.end('我是响应体 hello http server')
});

//设置server.listen(nodejs端口号，箭头函数执行任务)
server.listen(9000, () => {
    console.log('启动服务...');
})