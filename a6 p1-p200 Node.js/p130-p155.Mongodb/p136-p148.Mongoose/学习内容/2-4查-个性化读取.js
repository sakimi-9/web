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
    // 通过 个性化读取 查询  三种(数据筛选 数据排序 数据截取)
    // 数据筛选   model.find().select({字段:1或0}).catch...    1显示该字段   0不显示该字段  _id字段默认为1  其他字段默认为0
    BookModel.find().select({ _id: 0, name: 1, author: 1 }).catch((err) => {
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('只显示名称与作者 的 书籍 查询结果为:', data);

    });

    // 数据排序   model.find().sort({字段:1或-1}).catch...    1按照该字段升序   -1按照该字段倒序(从大到小)
    BookModel.find().select({ _id: 0, name: 1, price: 1 }).sort({ price: 1 }).catch((err) => {
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('价格从小到大 查询结果为:', data);

    });

    // 数据截取   model.find().skip(要跳过的文档数).limit(要限定显示的文档数).catch...
    BookModel.find().select({ _id: 0, name: 1, price: 1 }).sort({ price: -1 }).skip(3).limit(5).catch((err) => {
        console.log('查询失败');
        return;
    }).then((data) => {
        console.log('价格从大到小排序 第4-8的大 书籍 查询结果为:', data);

    });



});

mongoose.connection.on('error', () => {
    console.log('连接失败');

});

mongoose.connection.on('close', () => {
    console.log('连接关闭');

});
