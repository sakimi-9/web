//require http module
var http = require('http');

//create http server
var server = http.createServer((request, response) => {
    response.end('hello world')
})

//set server.listen
server.listen(9000, () => {
    console.log('服务启动');
})