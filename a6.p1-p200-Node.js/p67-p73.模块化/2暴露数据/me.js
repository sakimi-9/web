//导入模块 引入暴露的数据模块
let test_object = require('./module test')//引入对应暴露数据的对象
let blowing = require('./module test').blowing//引入暴露数据对象里的blowing
let run = require('./module test').run

console.log(test_object);
blowing();
run();