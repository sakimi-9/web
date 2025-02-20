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
    BookModel.findOne({ name: '狂飙' }).catch((err) => {
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('查询结果为:', data);

    });

    BookModel.findById('66dcc65bd199b0d8d9440829').catch((err) => {
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('查询结果为:', data);

    });

    BookModel.find().catch((err) => {
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('查询结果为:', data);

    });

});

mongoose.connection.on('error', () => {
    console.log('连接失败');

});

mongoose.connection.on('close', () => {
    console.log('连接关闭');

});
