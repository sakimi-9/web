/**
 * 封装一个函数 mineReadFile 读取文件内容
 * 参数:  path  文件路径
 * 返回:  promise 对象
 */
//手动封装promise形式的fs模块


import * as fs from "node:fs";

//如果promise对象里面除了函数参数,还有其他的参数要传入使用,那么要将promise用函数封装并返回promise对象
// let mineReadFile = (path) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, (err, data) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(data);
//         });
//     });
// };
//上下两种写法都可以,下面这种更加常见
let mineReadFile = (path) => {
    const p = new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
    return p;
};





//容器函数封装promise,所以这里可以传入实参
mineReadFile('C:\\前端源码\\a7.网络请求及promise\\2.Promise\\1.promise基本使用\\content.txt')
    .then((value) => {
        console.log(value.toString());
    }, (reason) => {
        console.log(reason);
    });

