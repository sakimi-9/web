// 1.安装mongoose
// 2.导入mongoose
const mongoose = require("mongoose");

// 3.连接mongodb服务
mongoose.connect('mongodb://127.0.0.1:27017/bookData');

//4.设置回调
mongoose.connection.once('open', () => {
    console.log('连接成功');

    //5.new 文档结构约束 schema
    const BookSchema = new mongoose.Schema({
        name: String,
        author: String,
        price: Number,
        is_hot: Boolean
    });

    //6.设置 文档封装对象
    const BookModel = mongoose.model('books', BookSchema);

    //7.通过 model 进行curd
    // 查 findOne 单查    findById 根据id单查     find 批量查询    格式有一点点不同 
    // model.findOne({ 筛选条件 }).catch...    model.findById('具体id').catch...     
    // model.find({ 筛选条件 }).catch...   查询符合条件的文档   无筛选条件时 model.find().catch...  查询该集合所有文档    

    //通过 条件控制  查询  三种(运算符 逻辑符 正则匹配)
    //运算符  mongoose条件控制来查询 不支持常规运算符  所以要用标识来代替
    //各标识所代表的运算符  $lt <      $gt >      $ne !=      $lte < =     $gte >=
    BookModel.find({ price: { $lt: 30 } }).catch((err) => { // 查询price 小于 30 的书
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('price 小于 30 的书 查询结果为:', data);

    });
    BookModel.find({ price: { $gte: 59 } }).catch((err) => { // 查询price 大于且等于 59 的
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('price 大于且等于 59 的 查询结果为:', data);

    });

    //逻辑符
    //$or 表示 逻辑或||   $and 表示 逻辑与&&
    BookModel.findOne({ $or: [{ name: '西游记' }, { name: '三国演义' }] }).catch((err) => { // 查询name为西游记 或者 name为三国演义 的
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('name为西游记 或者 name为三国演义 的 查询结果为:', data);

    });
    BookModel.findOne({ $and: [{ name: '活着' }, { name: '水浒传' }] }).catch((err) => { // 查询name为活着 和 name为水浒传 的
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('name为活着 和 name为水浒传 的 查询结果为:', data);

    });


    //正则匹配
    BookModel.findOne({ name: /狂/ }).catch((err) => { // 简洁写法/ /
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('模糊查询 包含 狂 的 查询结果为:', data);

    });
    BookModel.findOne({ name: new RegExp('狂') }).catch((err) => { // 常规写法 new RegExp()
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('模糊查询 包含 狂 的 查询结果为:', data);

    });


});

mongoose.connection.on('error', () => {
    console.log('连接失败');

});

mongoose.connection.on('close', () => {
    console.log('连接关闭');

});
