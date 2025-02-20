//import http module
var http = require('http');
var fs = require('fs');

//create server object
var server = http.createServer((request, response) => {

    //http 实现网页引入外部资源 至关重要的http知识
    // html里引入css, js 但是不能直接呈现，需要根据css, js不同路径名来响应对应的响应头和响应体
    let { pathname } = new URL(request.url, 'http://127.0.0.1:9000')
    if (pathname === '/') {
        // response.setHeader('content-type', 'text/html;charset=utf-8');//这个不能放if外面，否则不能对应路径来响应，从而阻塞响应
        let html = fs.readFileSync(__dirname + '/test.html')
        response.end(html);
    } else if (pathname === '/test.css') {
        // response.setHeader('content-type', 'text/css;');//这个不能放if外面，否则不能对应路径来响应，从而阻塞响应
        let html_css = fs.readFileSync(__dirname + '/test.css')
        response.end(html_css);
    } else if (pathname === '/test.js') {
        // response.setHeader('content-type', 'text/js;');//这个不能放if外面，否则不能对应路径来响应，从而阻塞响应
        let html_js = fs.readFileSync(__dirname + '/test.js')
        response.end(html_js);
    } else {
        response.statusCode = 404;
        response.end('<h1>404 Not Found</h1>')
    }


})

//set server.listen
server.listen(9000, () => {
    console.log('服务启动...');
})