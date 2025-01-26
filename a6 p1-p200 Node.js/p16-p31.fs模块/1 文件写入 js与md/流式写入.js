//导入fs模块  这是固定的
var fs = require('fs');
//打开写入通道
var ws = fs.createWriteStream("流式写入 test.md");
//写入操作
ws.write('创建写入流通道\r\n')
ws.write('用write方法不断写入\r\n')
ws.write('全部写入完成后自动关闭通道\r\n')
ws.write('所以用close方法关闭通道，可选\r\n')
//关闭通道
ws.close()