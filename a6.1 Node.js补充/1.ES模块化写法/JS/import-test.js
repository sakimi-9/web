import { hello, hi, b, func } from "./export-test.js";//导入对象 并 对象解构 |  将单个或多个变量导入
import a1 from "./export-test.js";//导入默认变量 并 使用其他名称
import * as object from "./export-test.js";//导入整个导出文件的所有变量的对象 * 并改名 object



console.log('hello hi:', hello + ' ' + hi);
console.log('导出文件的默认a(改名a1):', a1);
console.log('b:', b);
console.log('矩形的周长:', func(a1, object.b));





