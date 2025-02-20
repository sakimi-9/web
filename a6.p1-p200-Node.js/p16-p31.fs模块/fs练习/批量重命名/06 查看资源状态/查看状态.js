const { log } = require('console');
var fs = require('fs');
fs.stat('./查看状态.js',
    (err, data) => {
        if (err) {
            console.log('stat 查看失败');
        }
        else {
            console.log('查看成功\r\n\r\n', data);
            console.log(data.isFile()); //判断是否为文件
            console.log(data.isDirectory());//判断是否为文件夹
        }
    }
)  //stat status 状态  callback有两个参数，err和data(状态object)
//stat对象里有许多键值对，szie代表文件大小 单位为Byte  1024B=1kb 1024kb=1mb
