//__dirname 保存着是 当前文件所在目录的绝对路径
//__dirname+'/文件.扩展名'  为 当前文件的绝对路径   这样可以避免因为命令行工作目录没有切换导致的相对路径bug
var fs = require('fs');
fs.writeFileSync(__dirname + '/test2', '')