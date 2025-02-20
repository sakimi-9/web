`lowdb` 是一个轻量级的 Node.js 数据库库，能够在本地文件系统上存储 JSON 数据。
适合小型项目或不需要复杂数据库功能的应用程序。
企业项目一般用不到
它提供了基本的 CRUD 操作,具体看 lowdb.js

### 安装
要使用 `lowdb`，首先需要通过 npm 安装它：
```bash
npm install lowdb@1.0.0
```
这个版本用的是 CommJS形式,新版用的是ES形式

如果还需要一个文件系统适配器（默认情况下 `lowdb` 使用 `fs` 模块），可以安装 `lowdb/adapters`：
```bash
npm install lowdb/adapters
```

### 注意事项
- `lowdb` 的数据操作是基于内存的，每次修改数据后都需要调用 `write()` 方法将更改保存到磁盘。
- 由于文件 I/O 操作可能会比较慢，对于高并发的应用场景，`lowdb` 可能不是最佳选择。


lowdb 一般会配合 shortid 一起使用,将生成的id与 ...数据对象元素合并成新的对象 写入db文件中
shortid 是 生成id的 包

### 安装
cnpm i shortid

### 使用流程
安装 -> 导入 -> 路由中使用

导入
const shortid =require('shortid');

路由中使用

router.post('path',(req,res)=>{
    //生成id
    let id = shortid.generate();
    //写入文件  配合lowdb
    db.get('').push({id:id,...res.body}).write();

})