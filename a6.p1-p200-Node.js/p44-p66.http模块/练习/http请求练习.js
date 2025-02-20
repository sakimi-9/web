//导入http模块
var http = require('http');

//create http server object

let server = http.createServer((request, response) => {
    let url = new URL(request.url, 'http://127.0.0.1:9000');//传入参数URL类实例化，url已经是路径信息存储对象，不用 parse解析了
    let { method } = request;//对象解构赋值 url里的method常用，所以直接拎出来用  请求方法是request对象的属性
    let { pathname } = url;//pathname 路径名称是 url实例化对象的属性 或者 url.parse(request.url)返回对象的属性
    response.setHeader('content-type', 'text/html;charset=utf-8');
    if (method == 'GET' && pathname == '/login') {//login 登录
        response.end('登录页面')
    } else if (method == 'GET' && pathname == '/reg') {//reg 注册
        response.end('注册页面')
    } else {
        response.end('not found')
    }


})

//set server.listen
server.listen(9000, () => {
    console.log('服务已启动...');
})



//对象解构赋值
//不清楚 属性的值时 let {属性名}=对象名  数组解构赋值就是将{}=>[],Object name=>Array name
//清楚 属性的值时 let {属性名}={属性：属性值，属性：属性值}