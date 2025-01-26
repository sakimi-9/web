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
    // 增 插入bookData
    let bookData = require('./bookData');//导入数据
    BookModel.insertMany(bookData).catch((err) => {

        console.log('insertMany失败');
        return;
    }).then((data) => {
        console.log('insertMany成功');

    }).finally(() => {
        // mongoose.disconnect();
    });

    // 改 updateOne单更  updateMany批量更新 格式一样  model.updateOne({筛选条件},{更新内容}).catch...
    //筛选条件 是 筛选指定指定字段 , 更新内容 是 更新该字段的指定属性值
    //updateMany批量更新 是 更新 符合筛选条件的 多个字段 的 同一属性的值
    BookModel.updateOne({ name: '红楼梦' }, { name: '石头记', price: 9.9 }).catch((err) => {
        console.log('updateOne单更失败');
        return;
    }).then((data) => {
        console.log('updateOne单更成功');

    });

    BookModel.updateMany({ author: '余华' }, { is_hot: true, price: 9.9 }).catch((err) => {
        console.log('updateMany多更失败');
        return;
    }).then((data) => {
        console.log('updateMany多更成功');

    }).finally(() => {
        mongoose.disconnect();
    });

});

mongoose.connection.on('error', () => {
    console.log('连接失败');

});

mongoose.connection.on('close', () => {
    console.log('连接关闭');

});
