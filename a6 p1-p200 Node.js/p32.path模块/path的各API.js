//使用path模块也要跟使用fs模块一样，先用require导入
let path = require('path');

//path模块各API中，最常用的是 resolve 方法   (绝对路径+相对路径) 
//用于规范拼接绝对路径和相对路径        一般为(__dirname+'/文件全名')
console.log(path.resolve(__dirname + '/path的各API.js' + '\r\n'));//第二个 相对路径 必须是该文件的子级路径（以前是同级，现在改了）
// console.log(path.resolve(__dirname + '\\path的各API.js' + '\r\n'));//反斜杠需要转义
//命令行输出会自动换行，所以\r\n就代表空一行了

//__dirname+'/文件全名' 也可以拼接为 文件的绝对路径  但是不规范
//可以理解为 resolve方法是将  __dirname+'/文件全名' 的拼接 规范化
console.log(__dirname + '/path的各API.js' + '\r\n');

//sep 属性  返回当前操作系统的路径分割符 Windows \  mac /
console.log(path.sep + '\r\n');

//__filename  保存着 当前文件的绝对路径  但是不能拿来直接用 需要转义
let str_path = __filename;
console.log(str_path);//C:\前端源码\a6 p1-p200 Node.js\p32.path模块\path的各API.js

str_path = 'C:\\前端源码\\a6 p1-p200 Node.js\\p32.path模块\\path的各API.js';

//parse 方法  解析路径返回存储路径信息的object
console.log(path.parse(str_path));

//basename 方法  解析路径返回存储路径信息object里的文件全名（basename）
console.log(path.basename(str_path));

//dirname 方法  解析路径返回存储路径信息object里的文件所在目录的绝对路径
console.log(path.dirname(str_path));

//extname 方法  解析路径返回存储路径信息object里的文件扩展名
console.log(path.extname(str_path));