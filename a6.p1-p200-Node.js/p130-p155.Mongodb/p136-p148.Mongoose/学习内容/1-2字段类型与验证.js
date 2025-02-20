//1.安装mongoose
//2.导入mongoose
const mongoose = require('mongoose');

//3.连接mongodb
// URl = 'mongodb协议:// + 本机回环地址 + : 默认端口 27017 + /数据库名称 '
mongoose.connect('mongodb://localhost:27017/database2');

//4.设置回调
mongoose.connection.once('open', () => {
    console.log('连接成功!');

    // 5.new 文档约束对象schema 规定文档的属性与值的类型
    const schema = new mongoose.Schema({
        // 设置字段类型与验证
        name: {
            type: String,
            required: true //设置 必填项  required 已导入
        },
        age: {
            type: mongoose.SchemaTypes.Decimal128, //高精度数字  这种特殊类型需要 SchemaTypes. 索引指定
            required: true
        },
        sex: {
            type: String,
            enum: ['男', '女']  //设置 选择项/枚举值  enum 菜单  填入的值必须是[]中的
        },
        miaoshu: {
            type: mongoose.SchemaTypes.Mixed,  //任意类型
            default: "描述为无"  //设置 默认值 
        },
        date: {
            type: Date,
            required: false
        },
        id: {
            type: Number,
            unique: true,  //设置 唯一值  该值不能重复在集合出现   unique 要重建集合才能生效
            required: true
        }
    });

    //6.设置集合封装模型
    const model_fz = mongoose.model('jihe_2', schema);

    //7.增  通过集合封装模型进行 curd
    model_fz.create({
        name: '张三',
        age: 20,
        sex: '男',
        date: Date.now(),
        id: 9582

    }).catch((error) => {
        console.log('create失败');

    }).then((data) => {
        console.log('create成功,新增数据为:', data);

    }).finally(() => {
        mongoose.disconnect();
    });


});

mongoose.connection.on('err', () => {
    console.log('连接失败');

});

mongoose.connection.on('close', () => {
    console.log('连接关闭');

});