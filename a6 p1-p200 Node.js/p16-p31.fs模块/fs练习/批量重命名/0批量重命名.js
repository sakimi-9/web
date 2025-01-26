var fs = require('fs');

var data_arr = fs.readdirSync('./');


// console.log(data_arr);
// 循环遍历数组元素，批量重命名为 原名前加0
for (let item of data_arr) {
    fs.renameSync(item, '0' + item)
}


// //调用数组forEach方法，循环遍历数组  去掉原名前部的0
// data_arr.forEach(item => {
//     //拆分文件名 以用于批量重命名
//     let zhname = item.split('0');//字符串方法split，以0为分割符，分割符消失，数组形式展示
//     let [space, newname] = zhname;//将zhname的各部分相应复制给数组
//     // console.log(newname);
//     fs.renameSync(item, newname)//将原名改为原名中的newname

// })
