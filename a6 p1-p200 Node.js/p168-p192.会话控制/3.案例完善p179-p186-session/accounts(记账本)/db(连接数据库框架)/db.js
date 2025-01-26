//1.安装mongoose
//2.导入mongoose
const mongoose = require('mongoose');

const { dbHost, dbPort, dbName } = require('./config(url配置)');//导入配置 并进行 对象解构赋值

//将这个框架作为函数体 并 暴露函数 
module.exports = function (success, error) {  //这两个参数是函数   success 连接成功执行的函数   error 失败执行的函数

    //判断error是否为函数类型 ,并 设置 错误处理的默认值       没有传递实参时 连接成功与否都会设置默认值
    //写了这个 可以省略 增删改查时 每次向error()的实参传递    因为 连接错误时 会寻找函数内部的 error()的默认值
    if (typeof error !== 'function') {//这个判断 能保证传递实参时,实参为一个函数,然后显示自定义的错误处理,而不是显示默认的错误处理
        function error() {
            console.log('连接失败');

        }
    }
    //3.连接mongodb服务
    mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

    //4.设置回调
    mongoose.connection.once('open', () => {
        console.log('连接成功');
        success();//连接成功执行
        console.log(error);

    });

    mongoose.connection.on('error', () => {
        error();//连接失败执行

        return;
    });

    mongoose.connection.on('close', () => {
        console.log('连接关闭');

    });

}
