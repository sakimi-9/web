//import http module
var http = require('http');

//create http server object
var server = http.createServer((request, response) => {
    //设置响应行 （响应状态码statusCode 响应状态描述statusMessage）
    response.statusCode = 201;//statusCode默认为200
    response.statusMessage = 'ok';//statusMessage用的非常少，因为使用statusCode时会自动匹配对应的statusMessage
    //设置响应头
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.setHeader('header', ['2', '3', '4']);//设置出现多个同一头名，将头值设置成元素为字符串的数组
    //设置响应体  
    // 1.write和end一起使用  write可以多次使用 响应体内容分散
    // 2.单使用一个end 所有响应内容放end里 响应体内容集中 
    //注意，无论哪种，end都必须有，有且只能有一个
    response.write('love you <br>');
    response.write('the same to you <br>');
    response.end('我是响应体');
})

//set server.listen
server.listen(9000, () => {
    console.log('服务启动...');
})