//复制文件  把这个文件的内容复制粘贴到另一个文件
//方式一  同步异步读取文件，把data写入新的文件
var fs = require('fs');
// fs.readFile('C:\\前端源码\\a6 p1-p200 Node.js\\p16-p31.fs模块\\1 文件写入 js与md\\座右铭.md',
//     (err_r, data) => {
//         if (err_r) {
//             console.log('读取失败');
//             return;
//         }
//         else {
//             fs.writeFile('复制 座右铭的内容.md',
//                 data,
//                 err_w => {
//                     if (err_w) { console.log('写入文件失败'); }
//                     else { console.log('写入成功,复制粘贴完成'); }
//                 })
//         }
//     })

//方式二  流式读取 流式写入文件
var rs = fs.createReadStream('C:\\前端源码\\a6 p1-p200 Node.js\\p16-p31.fs模块\\1 文件写入 js与md\\座右铭.md');
// var ws = fs.createWriteStream('./复制 座右铭 的内容2.md');
// rs.pipe(ws);//pipe 管道 将rs读取的 通过 管道传给ws写入

rs.on('data', chunk => {
    // var ws = fs.createWriteStream('./复制 座右铭 的内容2.md');  //流式写入
    //ws.write(chunk)
    // ws.close()
    fs.appendFileSync('./复制 座右铭 的内容2.md', `${chunk} \r\n\r\n`)//`${}`是js里的字符串模板语法  {{}}是vue里面的动态变量
    //\r\n 是换行   \r\n\r\n 是空一行
})
rs.on('end', () => { console.log('复制成功'); })
