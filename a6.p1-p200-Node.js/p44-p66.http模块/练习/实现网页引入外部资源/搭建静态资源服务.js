//import http module
var http = require('http');
var fs = require('fs');
var path = require('path')

var mime = { //mime对象
    html: 'text/html' + ';charset=utf-8',  //html的meta标签也设置了 charset=utf-8(响应头也设置，更加规范) ,这两者，html响应头设置的字符编码优先级更高 
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    json: 'application/json'
}
//create server object
var server = http.createServer((request, response) => {
    //完善错误处理  请求方法不对时
    if (request.method != 'GET') {
        response.statusCode = 405;
        response.end('<h1>405 请求方法错误</h1>')
        return;
    }
    // response.setHeader('content-type', 'text/html;charset=utf-8');//这个不能加在读取的外面，因为与不同对应路径返回对应的响应体起冲突，导致响应阻塞
    //这只是html文件路径对应的响应头，不是css与js对应的响应头，所以这个放读取外面会阻塞引入在html里css与js的报文响应  不匹配 对应不上 后面的无法加载
    let url = new URL(request.url, 'http://127.0.0.1:9000');
    let { pathname } = url;
    //搭建静态资源服务 网站输入 对应的pathname就能访问对应的静态资源
    let root = __dirname + '/page';//静态资源目录/网站根目录 
    // 想访问哪个文件夹下的，就以__dirname为起点，把后面要加的路径改了 比如上级文件夹 '/../'
    let filepath = root + pathname;
    fs.readFile(filepath, (err, data) => {//浏览器输入不同的pathname>request重新请求>url变得不同>pathname变得不同>filepath会变成对应的路径>也就实现了不同路径访问对应资源
        if (err) {
            console.log('请求失败');
            //完善错误处理 根据错误代号 code 返回对应的响应体  写在报错情况下，别写在请求成功里面
            response.setHeader('content-type', 'text/html' + ';charset=utf-8');//解决报错页面 中文乱码
            switch (err.code) {
                case 'ENOENT':
                    response.end('<h1>404 没有找到资源</h1>')
                    break;

                default:
                    response.end('<h1>500 服务器未知错误</h1>')
                    break;
            }
        } else {
            //设置mime类型 媒体类型  根据文件扩展名来对应mime的type
            // 设不设置都可以(浏览器有mime嗅探器，识别文件扩展名来配置相应的mime)，设置了更加规范，并且支持中文要自己设置
            let ext = path.extname(filepath).slice(1);//据对应文件的完整路径，获取extname,并用slice（1）来切片，去掉.
            let type = mime[ext]//获取mime对象里对应的属性值，object[属性]==object.属性
            if (type) {//如果type属于mime对象中，则设置对应的响应头  没有则设置其他类型的
                //解决乱码问题 
                response.setHeader('content-type', type);
                // response.setHeader('content-type', `${type};charset=utf-8`)//解决全文件中文乱码  实际上没必要
                // html文件设置字符编码就行 因为引入的js css 图片等等，引入后会按照html的charset呈现
            } else {
                response.setHeader('content-type', 'application/octet-stream')
            }

            response.end(data)
        }
    })

})

//set server.listen
server.listen(9000, () => {
    console.log('服务启动...');
})