const mongoose = require('mongoose');
//5.new 文档结构约束 Schema   
//准备模型文件
const accountSchema = new mongoose.Schema({
    // id: {
    //     type: String, 
    // },  //mongoose 会自动生成id
    title: {
        type: String,
        require: true
    },
    time: {
        type: Date,
        require: true
    },
    type: {
        type: Number,
        enum: [-1, 1],  //可选项   -1为支出 1为收入
        default: -1   //默认为支出
    },
    account: {
        type: Number,
        require: true
    },
    remarks: {
        type: String,
    }
});

//6.设置 文档封装对象 model
const accountModel = mongoose.model('accounts', accountSchema);

//增删改查 都是 对 model 进行 所以导出model就行
module.exports = accountModel;