// 1.安装mongoose
// 2.导入mongoose
const mongoose = require('mongoose');

// 3.连接mongodb服务 记得打开mongod 不然连不上
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');

// 4.设置回调
mongoose.connection.once('open', () => {
    console.log('连接成功');

    // 5.new 文档结构约束 Schema 
    const BookSchema = new mongoose.Schema({
        name: String,
        author: String,
        price: Number,
        is_hot: Boolean
    });

    // 6.设置文档封装对象 model    集合名称为英文单词时mongoose会自动将它改为复数
    let BookModel = mongoose.model('novel', BookSchema);  //mongo上show collections 显示 novels

    // 7.通过 model 进行 curd

    // 增      将create 改为 insertMany 可批量插入内容  注意格式  model.insertMany([{ 文档1 }, { 文档2 }...]).catch...
    // BookModel.insertMany([
    //     {
    //         name: '西游记',
    //         author: '吴承恩',
    //         price: 19.9,
    //         is_hot: true
    //     }, {
    //         name: '红楼梦',
    //         author: '曹雪芹',
    //         price: 29.9,
    //         is_hot: true
    //     }, {
    //         name: '三国演义',
    //         author: '罗贯中',
    //         price: 25.9,
    //         is_hot: true
    //     }, {
    //         name: '水浒传',
    //         author: '施耐庵',
    //         price: 20.9,
    //         is_hot: true
    //     }, {
    //         name: '活着',
    //         author: '余华',
    //         price: 19.9,
    //         is_hot: true
    //     }, {
    //         name: '狂飙',
    //         author: '徐纪周',
    //         price: 68,
    //         is_hot: true
    //     }, {
    //         name: '大魏能臣',
    //         author: '黑男爵',
    //         price: 9.9,
    //         is_hot: false
    //     },
    //     {
    //         name: '知北游',
    //         author: '洛水',
    //         price: 59,
    //         is_hot: false
    //     }, {
    //         name: '道君',
    //         author: '跃千愁',
    //         price: 59,
    //         is_hot: false
    //     }, {
    //         name: '七煞碑',
    //         author: '游泳的猫',
    //         price: 29,
    //         is_hot: false
    //     }, {
    //         name: '独游',
    //         author: '酒精过敏',
    //         price: 15,
    //         is_hot: false
    //     }, {
    //         name: '大泼猴',
    //         author: '甲鱼不是龟',
    //         price: 26,
    //         is_hot: false
    //     },
    //     {
    //         name: '黑暗王者',
    //         author: '古羲',
    //         price: 39,
    //         is_hot: false
    //     },
    //     {
    //         name: '不二大道',
    //         author: '文刀手予',
    //         price: 89,
    //         is_hot: false
    //     },
    //     {
    //         name: '大泼猴',
    //         author: '甲鱼不是龟',
    //         price: 59,
    //         is_hot: false
    //     },
    //     {
    //         name: '长安的荔枝',
    //         author: '马伯庸',
    //         price: 45,
    //         is_hot: true
    //     },
    //     {
    //         name: '命运',
    //         author: '蔡崇达',
    //         price: 59.8,
    //         is_hot: true
    //     },
    //     {
    //         name: '如雪如山',
    //         author: '张天翼',
    //         price: 58,
    //         is_hot: true
    //     },
    //     {
    //         name: '三体',
    //         author: '刘慈欣',
    //         price: 23,
    //         is_hot: true
    //     },
    //     {
    //         name: '秋园',
    //         author: '杨本芬',
    //         price: 38,
    //         is_hot: true
    //     },
    //     {
    //         name: '百年孤独',
    //         author: '范晔',
    //         price: 39.5,
    //         is_hot: true
    //     },
    //     {
    //         name: '在细雨中呼喊',
    //         author: '余华',
    //         price: 25,
    //         is_hot: true
    //     }
    // ]).catch((error) => {
    //     console.log('insertMany失败');

    // }).then((data) => {
    //     console.log('insertMany成功');

    // }).finally(() => {
    //     mongoose.disconnect();//关闭连接
    // })

    //删  deleteOne单删  deleteMany批量删除  格式一样    model.deleteOne({筛选条件}).catch...
    BookModel.deleteOne({ _id: "66dc3033e1cee4c6c9ec1872" }).catch((error) => {
        console.log('deleteOne 单删失败');
        return;  //代码停止
    }).then((data) => {
        console.log('deleteOne 单删成功', data);//deletedCount 删除数量

    }).finally(() => {
        // mongoose.disconnect();
    });
    BookModel.deleteMany({ is_hot: false }).catch((error) => {
        console.log('deleteMany 多删失败');
        return;  //代码停止
    }).then((data) => {
        console.log('deleteMany 多删成功', data);//deletedCount 删除数量

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
