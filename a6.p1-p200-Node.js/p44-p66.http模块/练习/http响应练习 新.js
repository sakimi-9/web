//将以前 把整个html代码放入 response.end 改成了 用fs读取html文件，再用变量放入end
//方便更新与修改代码，写代码时还有高亮与快捷输入等等     
//不用浏览器重新发送请求与重启服务，也可以更新响应体
//import http module
var http = require('http');
var fs = require('fs');

//create server object
var server = http.createServer((request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    let html = fs.readFileSync(__dirname + '/test.html')
    response.end(html);
})

//set server.listen
server.listen(9000, () => {
    console.log('服务启动...');
})