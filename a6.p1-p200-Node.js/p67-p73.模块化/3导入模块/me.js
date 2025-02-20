//导入其他模块
let ob_t0 = require('./其他形式test')
let ob_t1 = require('./其他形式test1.abc')
let ob_t2 = require('./文件夹test')


//JSON.parse(json_object)=>jscode  解析json对象转为jscode
// JSON.stringify(js_object)=>json形式  转js对象为json形式

console.log(JSON.stringify(ob_t0));
console.log(JSON.parse(JSON.stringify(ob_t0)));

console.log("\r\n\r\n");
console.log(ob_t0 + '\r\n');
console.log(ob_t1 + '\r\n');
console.log(ob_t2 + '\r\n');
console.log(ob_t2.log + '\r\n');
console.log(ob_t2.log2 + '\r\n');
