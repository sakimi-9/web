const mongoose = require('mongoose');

const db = require('../db(连接数据库框架)/db');//导入连接数据库框架

const bookModel = require('../models(各集合模型)/bookModel');//导入文档封装对象模型

const bookData = require('../../学习内容/bookData');//导入测试用的数据
//7.curd
db(//调用数据库框架
    () => {//给success()传入实参
        bookModel.insertMany(bookData).catch((err) => {

            console.log('insertMany失败');
            return;
        }).then((data) => {
            console.log('insertMany成功');

        }).finally(() => {
            // mongoose.disconnect();
        });
    }
    // ,  错误处理实参传递 可以省略,因为 连接失败时 执行连接失败的callback(里面是error()), 没有 给error()传入实参 ,则会 向db内部寻找 找到错误处理的默认值  
    // () => {//给error()传入实参   
    //     console.log('连接失败');

    // }
);
