//ES形式导入 fs 模块
import { readFile } from 'fs';

//使用回调函数读取文件
//回调地狱
readFile('./文本内容/文本1.md', (err1, data1) => {
    if (err1) throw err1;
    readFile('./文本内容/文本2.md', (err2, data2) => {
        if (err2) throw err2;
        readFile('./文本内容/文本3.md', (err3, data3) => {
            if (err3) throw err3;
            //组合输出
            console.log('传统回调读取的:' + '\r\n', data1 + '\n' + data2 + '\n' + data3 + '\n\n');
        })
    })
})

//使用async结合await的异步函数的形式读取文件

//导入util模块的promisify
import { promisify } from 'util';

//将readFile转为promise形式
const readFilePromise = promisify(readFile);

//async函数
async function main() {
    try {
        //await等待  同步里面的异步函数,让其按顺序执行
        const data1 = await readFilePromise('./文本内容/文本1.md');
        const data2 = await readFilePromise('./文本内容/文本2.md');
        const data3 = await readFilePromise('./文本内容/文本3.md');
        //组合输出
        console.log('异步回调读取:' + '\r\n', data1 + '\n' + data2 + '\n' + data3);
    } catch (e) {
        console.log('读取失败', e);
    }
}

//调用函数
main();


