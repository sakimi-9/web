// util.promisify()
// 不管是内置函数还是自定义函数, 只要满足错误优先回调模式, 就都可以自动封装promise
// 常用于自动封装内置函数 如fs.readFile()  封装自定义函数容易出错 
// 使用 util.promisify() 的基本步骤
// 确保你的函数遵循错误优先回调模式 (err,data)：这意味着回调函数的第一个参数应该是一个错误对象（如果没有错误则为 null 或 undefined），后续参数是异步操作的结果。
// 使用 util.promisify() 封装你的函数：将你的异步函数传递给 util.promisify()，它将返回一个封装了Promise的新函数

import { log } from 'node:console';
import * as fs from 'node:fs';
import * as util from 'node:util';


let mineReadFile = util.promisify(fs.readFile);//自动封装内置函数fs.readFile

mineReadFile('C:/前端源码/a7.网络请求及promise/2.Promise/1.promise基本使用/content.txt')
    .then((value) => {
        console.log(value.toString());

    }, (reason) => {
        console.log(reason);
    })



