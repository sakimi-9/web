import { Hello } from "./hello";
console.log(Hello);
import ws from './hello';
ws();
import * as ob from "./hello";
console.log(ob.Hello + ' ' + ob.default());

//这个babel转码器真的麻烦  全局安装（可能还要配置环境变量）  工作目录下载插件   工作目录用命令在终端运行要转码的文件
//还是会出问题！！！
//看教程搞清楚再弄 别再这个什么继续浪费时间了！

//已解决  看下面这个  其实是环境变量配置有问题 没有配置这个
// (先获取全局安装路径 npm config get prefix 然后将结果塞入path) C: \Users\acer\.local(这个就是全局安装路径) 可能还需要 C: \Users\acer\.local\babel

// 全局安装有问题的 目前遇到这两种常见的 以nodemon为例，解决进行了
// nodemon全局安装完后，使用报错 未识别到nodemon 是因为没有进行 修改 windows 执行策略，
// 如果还报错 0x5拒绝 未调入签名 ，是因为没有进行环境变量配置 / 配置错误
// 进行环境变量配置
// 环境变量配置是配置 如 C: \Users\acer\.local\nodemon 到path里面
// 不是 C: \Users\acer\.local\nodemon\bin 这个里面根本就没有package.json文件，执行不了，所以还会报错