

### 其他常用的

1.**SHOW**
   ```sql
- 展示数据库
  SHOW DATABASE;
- 展示表
  SHOW TABLE;
  ```


### 数据定义语言（DDL）

1. **CREATE TABLE**
   - 创建新表。
   ```sql
   -- 先选择使用这个数据库才能创建表
   USE your_database;

   -- 创建一个名为 users 的新表，包含 id、name 和 email 字段
   CREATE TABLE users (
       id INT PRIMARY KEY,          -- 主键，唯一标识每条记录
       name VARCHAR(100),           -- 用户名，最大长度为 100 个字符
       email VARCHAR(150) UNIQUE    -- 邮箱地址，最大长度为 150 个字符，并且必须唯一
   );
   ```

2. **ALTER TABLE**
   - 修改现有表的结构。
   ```sql
   
   -- 向 users 表添加一个名为 age 的新字段
   ALTER TABLE users ADD COLUMN age INT;  
   ```

3. **DROP TABLE**
   - 删除表。
   ```sql
   
   -- 删除名为 users 的表
   DROP TABLE users;
   ```

### 数据操纵语言（DML）

1. **INSERT INTO**
   - 向表中插入新记录。
   ```sql
   
   -- 向 users 表插入一条新的记录
   INSERT INTO users (id, name, email) VALUES (1, 'Alice', 'alice@example.com');
   ```

2. **SELECT**
   - 查询表中的数据。
   ```sql
   
   -- 查询 id 为 1 的用户的详细信息
   SELECT * FROM users WHERE id = 1;
   ```

3. **UPDATE**
   - 更新表中的数据。
   ```sql
   
   -- 将 id 为 1 的用户的邮箱地址更新为新的地址
   UPDATE users SET email = 'alice.new@example.com' WHERE id = 1;
   ```

4. **DELETE**
   - 删除表中的记录。
   ```sql
   
   -- 删除 id 为 1 的用户记录
   DELETE FROM users WHERE id = 1;
   ```

### 数据控制语言（DCL）

1. **GRANT**
   - 授予用户权限。
   ```sql
   
   -- 授予用户 username 选择和插入权限到 users 表
   GRANT SELECT, INSERT ON users TO 'username'@'localhost';
   ```

2. **REVOKE**
   - 撤销用户的权限。
   ```sql
   
   -- 撤销用户 username 对 users 表的选择权限
   REVOKE SELECT ON users FROM 'username'@'localhost';
   ```

### 其他常用语句

1. **JOIN**
   - 连接多个表以获取相关数据。
   ```sql
   
   -- 查询 users 表和 orders 表的关联数据，只返回匹配的记录
   SELECT u.name, o.order_date
   FROM users u
   INNER JOIN orders o ON u.id = o.user_id;
   ```

2. **GROUP BY**
   - 对结果集进行分组并执行聚合函数。
   ```sql
   
   -- 按国家分组统计用户数量
   SELECT country, COUNT(*) AS num_users
   FROM users
   GROUP BY country;
   ```

3. **HAVING**
   - 在聚合后的结果集上应用条件。
   ```sql
   
   -- 统计用户数量超过 100 的国家
   SELECT country, COUNT(*) AS num_users
   FROM users
   GROUP BY country
   HAVING COUNT(*) > 100;
   ```

4. **ORDER BY**
   - 对查询结果进行排序。
   ```sql
   
   -- 按用户名降序排列用户列表
   SELECT * FROM users ORDER BY name DESC;
   ```

5. **LIMIT**
   - 限制查询结果的数量。
   ```sql
   
   -- 查询前 10 条用户记录
   SELECT * FROM users LIMIT 10;
   ```

这些 SQL
 语句包含了基本的操作，可以帮助你更好地理解和管理数据库。