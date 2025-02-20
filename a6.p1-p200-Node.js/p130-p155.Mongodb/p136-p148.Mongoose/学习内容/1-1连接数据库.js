// 客户端上 用mongoose 代替 mongo 连接mongod,意味着 操作上 代码程序 代替 命令行 , 操作更加方便且可自动化

//1.安装mongoose
//2.导入mongoose
const mongoose = require('mongoose');

//                          connect 连接 v  connection 连接 n
//3.连接mongodb服务 mongoose.connect('URL');   要连接 则先打开 mongod服务端
//URL=     mongodb协议 :// 本机回环ip  : 27017(mongodb默认端口)  /  数据库名称 (要连接的数据库 没有则自动新建)
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');

//4.设置回调 mongoose.connection.on('事件绑定',()=>{});
mongoose.connection.once('open', () => {
    console.log('连接成功');
    //#5,6,7步# 5.new 一个 文档结构对象   设置 collection 集合中文档的属性及属性值的类型 
    let bookschema = new mongoose.Schema({ //Schema 架构(规则/约束)
        name: String,
        age: Number,
        sex: String
    });
    //6.设置集合的封装对象 模型   mongoose.model('集合名称',文档结构对象Schema)
    let bookmodel = mongoose.model('books', bookschema);
    //7.增 插入内容    使用封装对象的create方法 进行内容插入   按照Schema(文档结构约束)将内容内容插入对应集合
    bookmodel.create({//很像异步写入
        name: '张三',
        age: 20,
        sex: '男'
        // }, (err, data) => {  集合模型.create()的这种内部回调函数,已淘汰,要改成promise的用.then((data)=>{}) .catch((err)=>{})  .finally(()=>{无论成功还是报错都会执行})
        //     if (err) {
        //         console.log('insert 失败');
        //         return;
        //     }
        //     console.log('insert 成功,数据为:', data);
    }
    ).catch((err) => {
        console.log('insert 失败');
        return;
    }).then((data) => {
        console.log('insert 成功,数据为:', data);
    }).finally(() => {
        // mongoose.disconnect();断开连接   用下面的延时断开连接 所以这个注释
    });
    //可用mongo命令来验证结果  use bilibili -> db.books.find()    不设置查询条件,默认查询所有
    // 查询结果 :{ "_id" : ObjectId("66c0bd9a48e03b49cb964977"), "name" : "张三", "age" : 20, "sex" : "男", "__v" : 0 }
    //id是mongodb生成的文档唯一标识符,__v是mongoose生成的文档内置版本号


});// event:open 连接成功的callback  
// on 可以改成 once(一次, 事件绑定且只执行一次)  event:open 推荐使用 once, 可以避免 重新连接 时 连接成功 函数体的部分代码 重复执行导致报错

mongoose.connection.on('error', () => {
    console.log('出错了 连接失败');
});//event:error 连接失败的callback

mongoose.connection.on('close', () => {
    console.log('连接关闭');
});//event:close 连接关闭的callback


//延时关闭 mongodb连接  也就是关闭 mongoose客户端与mongodb服务里的mongod服务端的连接   
setTimeout(() => {
    mongoose.disconnect();   //disconnect 断开(连接)  dis 反义前缀 
}, 10000);