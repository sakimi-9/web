//require ejs
const ejs = require('ejs');

const fs = require('fs');

let arr = ['a', 'b', 'c', 'd'];


//ejs.render()  --列表渲染
//<%= %>是表达式标识  <% %>是语句标识 if~else switch for 数组遍历语句等等，语句标识包住的语句会被执行
//语句：执行操作的结构
//js语句标识 可以是多个标识来组成一个语句，语句标识要把那一行的结构包住，全部结构都要(否则报错)，中间的表达式是用表达式标识包住，不是用语句标识(否则报错)
//简而言之，语句标识要把结构的开始与结束包住，中间的表达式不用。  一般 为包住 {的一行  与   }的一行
let str_1 =
    `<ul>
<% arr.forEach(item => { %>
    <li><%= item %></li>
<% }) %>
</ul>`;

fs.readFile(__dirname + '/index.html', (err, data) => {
    if (err) {
        console.log('读取失败');
    } else {
        let str_2 = data.toString();
        let result_2 = ejs.render(str_2, { arr });
        console.log(result_2);

    }
});


let result_1 = ejs.render(str_1, { arr });

console.log(result_1);


