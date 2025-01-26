//mjs 导入mysql2/promise版本
import mysql from 'mysql2/promise';

//创建连接的配置对象
const connection = mysql.createPool({//创建连接池
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'dataBase_curdTest'
});

//改-更改数据
//单条更改
const updateUser = (id, newUsername) => {
    let sql = `UPDATE user SET username = ? WHERE id = ? `;
    connection.execute(sql, [newUsername, id])
        .catch((err) => {
            console.log('update 更新失败 err:', err);
            return;
        }).then((resultMsg) => {
            console.log('update 更新成功,结果信息为:', resultMsg);
        })
};


//批量更改
const updateManyUser = (upUser) => {
    //拼接根据id更新对应username的sql  自适应传入的数量
    let sql = `UPDATE user SET username = CASE `;

    let values = upUser.flatMap((upUser) => `WHEN id = ${upUser.id} THEN '${upUser.newUsername}' `).join(' ');
    let values1 = upUser.flatMap((upUser) => `${upUser.id}`).join(',');

    sql += values + ` ELSE username END WHERE id IN (` + values1 + ')';

    connection.execute(sql)//conn.execute(可以只放一个sql语句参数)   批量处理时 只放一个sql语句参数 更好处理一些,因为不用管占位符的问题
        .catch((err) => {
            console.log('updateMany 更新失败 err:', err);
            return;
        }).then((resultMsg) => {
            console.log('updateMany 更新成功,结果信息为:', resultMsg);
        })
};

updateUser(2, '腰间三炮');

let updateData = [
    { id: 7, newUsername: '宫崎英俊' },
    { id: 1, newUsername: '马山风' },
    { id: 3, newUsername: '美创库子' }
];

updateManyUser(updateData);


//关闭连接池
setTimeout(() => {
    connection.end()
        .catch((err) => {
            console.log('数据库连接池 关闭失败');
            return;
        }).then((resultMsg) => {
            console.log('数据库连接池 关闭成功,结果信息为:', resultMsg);
        })
}, 50000) 