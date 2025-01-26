//moudel ES形式导入
//导入fs模块
import { log } from 'node:console';
import * as fs from 'node:fs';//导入的总对象来自node:fs,并改名为fs
//commjs 导入写法  const fs=require('fs')
//ES写法导入 node内置模块时 要这么写


// //回调函数
// fs.readFile('content.txt', (err, data) => {//异步读取
//     if (err) throw err;//如果报错 抛出err 然后继续执行
//     console.log(data.toString());
// })



//promise
const p = new Promise((resolve, reject) => {
    fs.readFile('content.txt', (err, data) => {
        if (err) reject(err);//只有一行省略了{}
        resolve(data);
    })
});

p.then(
    value => {
        console.log(value.toString());
    },//fs读取的是Buffer,所以这里转义
    reason => {
        console.log('报错对象:' + reason);
    })