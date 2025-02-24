//object 与 Object 范围太大，用的都很少
//object 可以存 非原始类型 string number boolean   null undefinde
//Object 与 any 区别很小 除了null undefinde 都可以存
//声明具体的object类型使用字面类型声明
//声明对象类型    分隔， ： 换行 都行   ? 表示此属性可选
var aa; //签名索引   为对象添加 动态属性
aa = {
    name: '王',
    age: 18,
    gender: '男'
};
//声明函数类型
var fun;
fun = function (a, b) {
    return a + b;
};
//声明数组类型
var arr1; //元素为string的数组
var arr2; //泛型写法也可以表示     大写首字母表示该类型的封装对象 只针对原始类型的 string number boolean
arr1 = ['s', 'sw'];
//声明元组类型  元组是一种特殊的数组，tuple并不是关键字
var tup1;
tup1 = ['2', 1];
console.log(aa + '\r\n');
console.log(fun(3, 4) + '\r\n');
console.log(arr1 + '\r\n');
console.log(tup1 + '\r\n');
//声明枚举类型  枚举是一组命名常量    声明时像类，但不一样
//数字枚举   打印时具有反向映射
var Direction1;
(function (Direction1) {
    Direction1[Direction1["Up"] = 0] = "Up";
    Direction1[Direction1["Down"] = 1] = "Down";
    Direction1[Direction1["Left"] = 2] = "Left";
    Direction1[Direction1["Right"] = 3] = "Right";
})(Direction1 || (Direction1 = {}));
//字符枚举
var Direction2;
(function (Direction2) {
    Direction2["Up"] = "up";
    Direction2["Down"] = "down";
    Direction2["Left"] = "left";
    Direction2["Right"] = "right";
})(Direction2 || (Direction2 = {}));
function walk(n) {
    if (n === Direction1.Up) {
        console.log("向【上】⾛");
    }
    else if (n === Direction1.Down) {
        console.log("向【下】⾛");
    }
    else if (n === Direction1.Left) {
        console.log("向【左】⾛");
    }
    else if (n === Direction1.Right) {
        console.log("向【右】⾛");
    }
    else {
        console.log("未知⽅向");
    }
}
walk(Direction1.Up);
var zf = 'str';
var arr_zs;
arr_zs = ['字符', 3];
var obj;
console.log(arr_zs);
console.log(obj = { name: '刘', gender: '女' });
var cj;
cj = {
    yuwen: 135,
    shuxue: 149,
    waiyu: 150
};
console.log(cj);
