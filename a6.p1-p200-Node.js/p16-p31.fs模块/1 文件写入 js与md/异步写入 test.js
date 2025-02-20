let fs = require("fs");
console.log(fs.writeFile('座右铭.md', '三人行，必有我师焉', (err) => {  //err可以写成其他的，写入成功会给回调函数传入 undefined
    if (err) { console.log("写入失败") }
    else { console.log('写入成功') };
}
));

function s() {
    return 1 + 1
}
d = () => { return 1 + 2 };
console.log(s(), d())
//摁住alt再用鼠标选择插入点，可实现多个位置同时写入相同的内容
//摁住alt再用鼠标选择插入点，可实现多个位置同时写入相同的内容
//摁住alt再用鼠标选择插入点，可实现多个位置同时写入相同的内容
//摁住alt再用鼠标选择插入点，可实现多个位置同时写入相同的内容
//摁住alt再用鼠标选择插入点，可实现多个位置同时写入相同的内容
//摁住alt再用鼠标选择插入点，可实现多个位置同时写入相同的内容