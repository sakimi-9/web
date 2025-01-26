const mongoose = require('mongoose');
//5.new 文档结构约束 Schema   
//准备模型文件
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

//6.设置 文档封装对象 model
const userModel = mongoose.model('user', userSchema);

//增删改查 都是 对 model 进行 所以导出model就行
module.exports = userModel;//F2 可对该变量进行全部重命名