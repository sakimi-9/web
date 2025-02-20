var fs = require('fs');

fs.mkdirSync('./removedirectory text/rmdir', { recursive: true });

//rmdir 单个删除 
fs.rmdir('../5 文件夹操作/递归创建a/b/c',
    err => {
        if (err) {
            console.log('删除失败');
        }
        else {
            console.log('删除成功');
        }
    })

//rmdirSync 同步 递归删除（删除文件夹及所嵌套的文件夹） 注意将可选选项配置 设置为 {recursive:true}
// fs.rmdirSync('./递归创建a', { recursive: true })

fs.renameSync('./removedirectory text', './removedirectory test')
//rm 递归删除  官方推荐使用rm
fs.rm('./removedirectory test', { recursive: true },
    err => {
        if (err) {
            console.log("remove 失败");
        } else {
            console.log('remove 成功');
        }
    })