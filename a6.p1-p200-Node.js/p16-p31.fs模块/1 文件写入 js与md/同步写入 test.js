const fs = require("fs");
fs.writeFileSync('test.md', 'writeFileSync 是 同步写入');

class l {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    };
    js(i, j) {
        console.log(this.i + this.j)
    }
}

var l1 = new l(2, 3);  //类要实例化才可以调用，传参也是在实例化时进行
l1.js();  //再用实例化对象来调用函数 
