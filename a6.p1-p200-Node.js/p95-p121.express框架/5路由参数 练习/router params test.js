//require express 与 json file
const express = require('express');
const { singers } = require('./singers.json');//导入并进行对象解构赋值

//express class 实例化应用对象
const app = express();

//配置路由规则
app.get('/singer/:id.html', (request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    let { id } = request.params;//获取路由参数
    //根据路由参数响应对应页面
    let result = singers.find(item => {//调用数组的find方法，（item=>{对数组元素进行操作}） 函数体为true则返回符合条件的数组元素
        if (item.id === Number(id)) {//用路由参数来匹配对应的数组元素
            return true;
        }
    })
    console.log(result);
    response.end(`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>${result.singer_name}</h1>
    <img src='${result.singer_pic}' alt="">
</body>

</html>
`);
})

//set app.listen
app.listen(3000, () => {
    console.log('router服务启动...');
})