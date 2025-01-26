//mjs  导入mysql2/promise版本
import mysql from "mysql2/promise";

//创建连接的配置对象
const connection = mysql.createPool({  //创建连接池
    host: 'localhost',//主机号
    user: 'root',//用户  注意,不是username
    password: '123456',//连接密码
    port: 3306,//端口号
    database: 'dataBase_curdTest',//连接的数据库

});
//这个配置对象的参数内容,和连接MySQL的图形化界面的配置一模一样

const table = 'user';//灵活配置表名

//增-插入数据
//单条插入
const insertUser = (username, email) => {//编写单条插入函数
    const sql = `INSERT INTO ${table} (username, email) VALUES (?,?)`;//sql的插入语句  ? 是占位符
    //单条插入时 VALUES 后面 是 (?,?)  ?与键名的个数一致
    connection.execute(sql, [username, email])//传入的数据是一个数组的话,那这里 就不要用[]包裹了  否则[]嵌套,导致出错
        //mysql2/promise版本 execute 执行  conn.execute(sql语句,[键名形参]).catch...  promise的回调函数  形参也就是实参要传入的位置
        //mysql2 默认版本 回调函数是写在里面 conn.(sql,[键名形参],callback)

        .catch((err) => {
            console.log('插入失败,err:', err);
            return;
        })
        .then((resultMsg) => {//resultMsg 结果信息
            console.log('插入成功的 结果信息:');//console.log() 用来打印原始的插入结果，
            console.dir(resultMsg, { depth: null });
            //console.dir(要输出的变量,{option})
            //console.dir()用来以树状结构展示对象的详细信息。depth:null 表示不限制对象的深度，从而可以展示所有的子属性
        })
};

//批量插入
const insertManyUser = (user, l) => {//编写批量插入函数  user是一个多元素的2维数组
    let sql = `INSERT INTO ${table} (username, email) VALUES `;//sql的插入语句

    // 为每个用户创建一个值对，并用逗号分隔   placeholders 占位符
    const placeholders = user.map(u => `(?, ?)`).join(', ');
    sql += placeholders;
    //遍历的循环次数为arr.length   这里是按照arr.length输出'(?,?),'  以让内容与占位符对应

    const values = user.flatMap((user) => [user.name, user.email]);
    //这里用 arr.flatMap() 对数组元素压扁处理才行   详细看这 ../笔记/arr.map与flatMap.md
    //把values放到sql的逻辑  [ a,b,c,d,e,f] ->(?,?),(?,?),(?,?)   => (a,b),(c,d),(e,f)   所以用flatMap


    connection.execute(sql, values)
        .catch((err) => {
            console.log('插入失败,err:', err);
            return;
        })
        .then((resultMsg) => {
            console.log('插入成功的 结果信息:');
            console.dir(resultMsg, { depth: null });
        })
};

insertUser('刘二狗', '1223123123@gmail.com');//调用插入函数,传入实参

let data = [
    { name: '张三', email: 'zhangsan@example.com' },
    { name: '李四', email: 'lisi@example.com' },
    { name: '王五', email: 'wangwu@example.com' }];


insertManyUser(data);

//关闭连接池
setTimeout(() => {
    connection.end()
    .catch((err) => {
        console.log('数据库连接池 关闭失败');
        return;
    }).then((resultMsg) => {
        console.log('数据库连接池 关闭成功,结果信息为:', resultMsg);
    })
}, 5000)

