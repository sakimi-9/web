var fs = require('fs');

var rs = fs.createReadStream('C:\\前端源码\\a6 p1-p200 Node.js\\p16-p31.fs模块\\1 文件写入 js与md\\座右铭.md') //流式读取 两个参数 路径 可选配置
//流式读取 返回的是 object
//所以，对它进行事件绑定rs.on()  data 才能读取数据
rs.on('data',
    chunk => { //chunk "块"  可以改成其他的 chunk是官方给的
        console.log(chunk); //data(Buffer形式)传入chunk,流式读入每一个块为65536字节 64kb ,小于64kb就只会输出一个chunk
        console.log(chunk.length);//数据的字节长度
        console.log(chunk.toString());//数据转化成字符串
    });

//事件绑定 end  可选  用于读取成功提示
rs.on('end', () => { console.log('读取成功'); })
