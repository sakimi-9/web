var fs = require('fs');

//readdir callback回调函数里面有两个参数 err和data（Array形式） 这是读取，所以还会返回读取的文件夹目录
fs.readdir('./',//读取当前文件夹的目录  
    (err, data) => {
        if (err) {
            console.log('读取失败');
        }
        else {
            console.log('读取成功', data);
        }
    }
)

//readdirSync 同步读取 相当于直接返回data(Array)
console.log(fs.readdirSync('../4 文件删除')); 