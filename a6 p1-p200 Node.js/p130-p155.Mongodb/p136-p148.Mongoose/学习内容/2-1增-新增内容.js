//连接到数据库
//1.安装mongoose
//2.导入
const mongoose = require('mongoose');

//3.连接 mongodb服务 
mongoose.connect('mongodb://127.0.0.1:27017/database1');

//4.设置回调
mongoose.connection.once('open', () => {
    console.log('连接成功');

    //5.new 一个 文档结构对象 约束    设置 collection 集合中文档的属性及属性值的类型
    const schema = new mongoose.Schema({
        name: String,
        age: Number,
        sex: String
    });
    //6.设置 集合封装对象 模型     mongoose.model('集合名称',文档结构对象Schema)
    let usersModel = mongoose.model('users', schema);// 集合名称为英文单词时mongoose会自动将它改为复数  如果名称为 user 则 mongo上 显示 users
    //7.增 插入内容   create 单增  insertMany 批量增加
    // 将create 改为 insertMany 可批量插入内容  注意格式  model.insertMany([{文档1},{文档2}...]).catch...
    usersModel.create({  //很像异步写入
        name: 'Frank',
        age: 22,
        sex: '男'
    },
        //安装了fold插件 ctrl+k+,  折叠所选区域  ctrl+k+j 将此展开  ctrl+k+l 将此折叠
        // (err, data) => {  集合模型.create()的这种内部回调函数,已淘汰,要改成promise的用.then((data)=>{}) .catch((err)=>{})  .finally(()=>{无论成功还是报错都会执行})
        //     if (err) {
        //         console.log('插入失败');
        //         return;
        //     }
        //     console.log('插入成功,数据为:', data);
        // }
    ).catch((err) => {
        console.log('插入失败');

    }).then((data) => {
        console.log('插入成功,插入的数据:', data);

    }).finally(() => {
        //关闭连接
        mongoose.disconnect();
    });

});
mongoose.connection.on('error', () => {
    console.log('连接失败');

});
mongoose.connection.on('close', () => {
    console.log('连接关闭');

});

