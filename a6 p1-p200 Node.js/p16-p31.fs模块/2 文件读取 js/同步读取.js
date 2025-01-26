//导入fs模块
var fs = require('fs');
//文件同步读取
let data = fs.readFileSync("C:\\前端源码\\a6 p1-p200 Node.js\\p16-p31.fs模块\\1 文件写入 js与md\\座右铭.md"); //同步读取 两个传入参数 路径 可选配置          直接返回数据
console.log(data);//数据为Buffer形式
console.log(data.toString());//对Buffer转字符串
