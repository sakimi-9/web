let fs = require('fs');
fs.appendFile('./座右铭.md', '\r\n则其善者而改之', err => {   //反斜杠 \r\n 表示换行  <br> 这是浏览器document.write（）的换行
    if (err) { console.log('appendFile 异步追加写入失败'); }
    else { console.log('appendFile 异步追加写入成功'); }
});
fs.appendFileSync('./座右铭.md', '\r\n确实痛苦，难道，这么点痛苦就要放弃了？能做成啥事？');
fs.writeFileSync('./座右铭.md', '\r\n让希望更加有希望，让安稳更加安稳', { flag: 'a' })  //可选配置 {flag:'a'}时，也可以进行追加操作