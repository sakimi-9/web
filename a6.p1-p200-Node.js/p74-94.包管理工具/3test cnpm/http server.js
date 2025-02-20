//require http module
let http = require('http');

//create http server
let server = http.createServer((request, response) => {
    response.end('hello world ,bug not')
})

//set server.listen
server.listen(9000, () => {
    console.log('serve start');
})