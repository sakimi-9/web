var fs = require('fs');
// fs.writeFileSync('删除unlink test.md',
//     `111
//    222
//       333`,
// )
// fs.writeFileSync('删除rm test.md',
//     `111
//    222
//       333`,
// )

fs.unlinkSync('删除unlink test.md',  //unlink 取消链接
    err => {
        if (err) {
            console.log('删除失败');
        }
        else {
            console.log("删除成功");
        }
    }
)
fs.rm('删除rm test.md',   //rm是新引入的，作用及语法格式与unlink一样   同步都是在后面加Sync 然后参数只有path路径，没有callback回调函数
    err => {
        if (err) {
            console.log('删除失败');
        }
        else {
            console.log("删除成功");
        }
    }
)