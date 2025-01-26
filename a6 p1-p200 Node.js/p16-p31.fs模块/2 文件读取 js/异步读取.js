const { log } = require('console');
var fs = require('fs');
fs.readFile('C:\\前端源码\\a6 p1-p200 Node.js\\p16-p31.fs模块\\1 文件写入 js与md\\座右铭.md',   //异步读取 三个参数，路径（添加第二个反斜杠是对第一个\进行转义  这样直接复制的路径才可以生效） 可选配置 回调函数  
    (err, data) => {  //异步读取的回调函数会返回两个参数 读取成功的undefined 和 文件数据
        if (err) {
            console.log('读取失败');
        }
        else {
            console.log('读取成功\r\n' + data.toString());
        }
    })