var fs = require('fs');
//新写个文件
// var str = `111
//    2222
//        3333`
// fs.writeFile('重命名与移动 test.md',
//     str,
//     err => {
//         if (err) {
//             console.log('写入失败');
//             return;
//         }
//         else {
//             console.log('写入成功');
//         }
//     })
//写入完成

//rename（'旧路径（文件名）'，'新路径'，回调函数）
// fs.rename('重命名与移动 test.md',
//     '重命名与移动 test-2.md',
//     err => {
//         if (err) {
//             console.log('重命名失败');
//         }
//         else {
//             console.log('重命名成功');
//         }
//     })

fs.rename('重命名与移动 test.md',
    '../fs练习/重命名与移动 test.md',
    err => {
        if (err) {
            console.log('移动失败');
        }
        else {
            console.log('移动成功');
        }
    }
)    