//mjs  导入mysql2/promise版本
import mysql2 from "mysql2/promise";

//创建连接的配置对象
const connection = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'dataBase_curdTest'
});

//删-删除数据
//单条删除  没有在sql语句中定义数量的话,这会把 符合条件的都删除
const deleteUser = (email) => {
    let sql = `DELETE FROM user WHERE email=?`;
    connection.execute(sql, [email])
        .catch((err) => {
            console.log('delete 删除失败 err:', err);
            return;
        }).then((resultMsg) => {
            console.log('delete 删除成功,结果信息为:', resultMsg);
        })
};

//批量删除
const deleteManyUser = (idArr) => {
    let sql = `DELETE FROM user WHERE id IN(`;//sql不知道怎么写,可以看看 ai写的格式,从而进行格式拼接
    //拼接sql 
    //方法一  给每个用户添加占位符
    // let placeholders = idArr.map(() => '?').join(',');
    // sql += placeholders + ')';//占位符与sql拼接
    // let values = idArr.flatMap(idArr => [idArr]);//将传入的数组,按照数组结构,映射压扁到另一个数组
    //方法二  排练处理时 显然是不管占位符和数据映射,单靠自适应的sql 更加方便
    let values = idArr.map((idArr) => `${idArr.id}`).join(',');
    sql += values + ')';



    connection.execute(sql)//conn.execute(可以只放一个sql语句参数) 批量处理时 只放一个sql语句参数 更好处理一些,因为不用管占位符的问题
        .catch((err) => {
            console.log('deleteMany 删除失败 err:', err);
            return;
        }).then((resultMsg) => {
            console.log('deleteMany 删除成功,结果信息为:', resultMsg);
        })
};

deleteUser('1223123123@gmail.com');

const idArr = [{ id: 1 }, { id: 2 }, { id: 3 }];

deleteManyUser(idArr);

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
