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

//查找数据
//单个查找  根据id查询对应用户的详细数据
const selectOneUser = (id) => {
    let sql = `SELECT * FROM user WHERE id = ?`;
    connection.execute(sql, [id])//要映射到sql语句里的数据一定是个数组 
        // 如果传入的实参是个数组, 那这里就不用[]包裹, 如果不是arr, 那么这里要[]包裹   [数据] 映射-> sql
        .catch((err) => {
            console.log('select 查询失败,err:', err);
            return;
        })
        .then((resultMsg) => {
            console.log('select 查询成功的 结果信息:', resultMsg);
            // console.dir(resultMsg, { depth: null });这里 depth:null 表示不限制对象的深度，展示所有的子属性  非常多 所以注释了
        })
}


selectOneUser(2);

//查询所有 查询整个user表的数据
const selectALLUser = () => {
    let sql = `SELECT * FROM user `;
    connection.execute(sql)
        .catch((err) => {
            console.log('select 查询失败,err:', err);
            return;
        })
        .then((resultMsg) => {
            console.log('select 查询成功的 结果信息:', resultMsg);
        })
}

selectALLUser();

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

