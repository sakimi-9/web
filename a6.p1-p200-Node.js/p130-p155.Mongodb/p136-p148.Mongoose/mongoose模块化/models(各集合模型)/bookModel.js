const mongoose = require('mongoose');
//5.new 文档结构约束 Schema
const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
});

//6.设置 文档封装对象 model
const bookModel = mongoose.model('books', bookSchema);

//增删改查 都是 对 model 进行 所以导出model就行
module.exports = bookModel;