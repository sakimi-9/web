var fs = require('fs');
//mkdir 单个创建
fs.mkdir('./makedirectory test',//mk make制作 dir directory 文件夹
    err => {
        if (err) {
            console.log('创建失败');
        }
        else {
            console.log('创建成功');
        }
    });

//mkdir 递归创建 （文件夹嵌套创建） 注意要将可选配置设置为 {recursive:true}
fs.mkdir('./递归创建a/b/c', { recursive: true },
    err => {
        if (err) {
            console.log('创建失败');
        }
        else {
            console.log('创建成功');
        }
    });
