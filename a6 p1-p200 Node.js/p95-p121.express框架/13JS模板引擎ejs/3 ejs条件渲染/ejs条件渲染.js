//require ejs
const ejs = require('ejs');

const fs = require('fs');

let flag = true;
let str_1 = '<span>您好 欢迎光临</span>';
let str_2 = '<strong>请慢走</strong>';

//下面str_1不用<%= %>表达式标识，是因为这个是自动转义的表达式标识，<%- %>才是非转义的表达式标识
//str_1的值是字符串，但字符串里有html标签，使用转义表达式标识会显示异常，使用非转义表达式标识才能正常显示含html标签的字符串
let str = `<% if(flag){ %>
<%- str_1 %> 
<% } else{ %>
<%- str_2 %>
<% } %>`;

let str_html = fs.readFileSync('./index.html').toString();

//ejs.render --条件渲染
let result = ejs.render(str, { flag, str_1, str_2 });
let result_html = ejs.render(str_html, { flag, str_1, str_2 });


console.log(result);
console.log(result_html);

