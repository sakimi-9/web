//ejs是一个外部依赖 先安装 cnpm i ejs
//require ejs
const ejs = require('ejs');

const fs = require('fs');

let str_1 = 'aa <%=B %>  <%= B.charAt(0) %> <%= B+C %> <%= console.log(B+C) %> ';
//一个表达式标识<%= %>里,只能装一个表达式，
// 表达式：产生值的结构，或者说 结果为一个具体值的式子，比如 变量，变量相加，使用字符串方法等等
let B = 'bb';
let C = 'cc';
let str_html = fs.readFileSync(__dirname + '/index.html').toString();//同步读取返回Buffer，需要toSting()才能正常显示，否则会报错，因为ejs.render()解析不了Buffer

//ejs.render() 渲染
//两个参数，第一个是template 模板(含变量标识的内容)，第二个是data 数据(含变量的对象) 
//逻辑，渲染template时，遇到变量标识，从后面data对象里找对应变量赋值过去
let result_1 = ejs.render(str_1, { B, C });
let result_2 = ejs.render(str_html, { B, C });
console.log(result_1);
console.log(result_2);