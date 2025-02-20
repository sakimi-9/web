//mjs  导入mysql2/promise版本
import { mysql } from "mysql2/promise";

//创建连接的配置对象
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dataBase_curdTest',
    port: 3306
});
//这个配置对象的参数内容,和连接MySQL的图形化界面的配置一模一样
