//导入下载的依赖 uniq   数组去重的依赖包
//下载到npm init初始化的文件夹，然后在这个文件夹下下载依赖，下载完也就成了这个文件夹的内置模块 
// 所以 用导入内置模块的方式   如果向导入自定义模块那样，写相对路径，那么require就不会向上级再向下找了，不够灵活
let uniq = require('uniq');

let arr = [1, 2, 2, 3, 3, 4];

console.log(uniq(arr));

//dev 开发 devDenpendencies 开发依赖(包)  只在开发阶段用
//dependencies (生产)依赖(包)  开发与生产阶段都要用