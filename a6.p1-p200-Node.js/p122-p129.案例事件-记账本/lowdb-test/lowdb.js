//了解即可 一般用不到 ,单独管理一些简单少量的数据 可以用用
//导入 lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');//文件写入路径  复用时记得改
//获取 db 对象
const db = low(adapter);

//初始化数据  初始化后记得注释本条  也可以手动初始化,这样方便点, 写一个JSON 文件 如 {"post":[]}
// db.defaults({ posts: [], user: {} }).write() //在另外一个文件初始化一个JSON,posts是里面的空数组,user 空对象

//写入数据 增
// db.get('posts').push({id: 2, title: '今天天气还不错~~'}).write();// 数组方法 push 从后增  pop 从后删
// db.get('posts').unshift({id: 3, title: '今天天气还不错~~'}).write();// 数组方法 unshift 从前增  shift 从前删

//获取单条数据  查
// let res = db.get('posts').find({id: 1}).value();//posts里id为1的数据
// console.log(res);

//获取数据  查
// console.log(db.get('posts').value());//整个posts的数据

//删除数据 删
// let res = db.get('posts').remove({id: 2}).write();
// console.log(res);

//更新数据 改
// db.get('posts').find({id: 1}).assign({title: '今天下雨啦!!!'}).write()
