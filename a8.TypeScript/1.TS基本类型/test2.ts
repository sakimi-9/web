//object 与 Object 范围太大，用的都很少
//object 可以存 非原始类型 string number boolean   null undefinde
//Object 与 any 区别很小 除了null undefinde 都可以存

//声明具体的object类型使用字面类型声明
//声明对象类型    分隔， ： 换行 都行   ? 表示此属性可选
let aa: {
    name: string, age: number; class?: string
    [key: string]: any
}//签名索引   为对象添加 动态属性

aa = {
    name: '王',
    age: 18,
    gender: '男'
}


//声明函数类型
let fun: (a: number, b: number) => number;
fun = function (a, b) {
    return a + b;
}


//声明数组类型
let arr1: string[];//元素为string的数组
let arr2: Array<string>;//泛型写法也可以表示     大写首字母表示该类型的封装对象 只针对原始类型的 string number boolean
arr1 = ['s', 'sw']


//声明元组类型  元组是一种特殊的数组，tuple并不是关键字
let tup1: [string, number];
tup1 = ['2', 1]

console.log(aa + '\r\n');
console.log(fun(3, 4) + '\r\n');
console.log(arr1 + '\r\n');
console.log(tup1 + '\r\n');


//声明枚举类型  枚举是一组命名常量    声明时像类，但不一样
//数字枚举   打印时具有反向映射
enum Direction1 {
    Up,
    Down,
    Left,
    Right
}

//字符枚举
enum Direction2 {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right"
}

//常量枚举   声明前加const,编译时会‘内联’
const enum Direction3 {
    Up,
    Down,
    Left,
    Right
}


function walk(n: Direction1) {
    if (n === Direction1.Up) {
        console.log("向【上】⾛");
    } else if (n === Direction1.Down) {
        console.log("向【下】⾛");
    } else if (n === Direction1.Left) {
        console.log("向【左】⾛");
    } else if (n === Direction1.Right) {
        console.log("向【右】⾛");
    } else {
        console.log("未知⽅向");
    }
}
walk(Direction1.Up)


//自定义类型 type
//基本类型                
type zifu = string;  //将ts原生类型改名

let zf: zifu = 'str';

//联合类型
type zfstr = string | number;  //设置此类型为 所写类型之一
type gender_2 = '男' | '女';  //设置此类型为 所写值之一

let arr_zs: zfstr[];
arr_zs = ['字符', 3]
let obj: {
    name: string,
    gender: gender_2
}

console.log(arr_zs);
console.log(obj = { name: '刘', gender: '女' });


//交叉类型   将多个类型合并为⼀个类型。合并后的类型将拥有所有被合并类型的成员。交叉类型通常⽤于对象类型。
type chenji_1 = {
    yuwen: number
};
type chenji_2 = {
    shuxue: number
};
type chenji_3 = {
    waiyu: number
};

type chenji_he = chenji_1 & chenji_2 & chenji_3;

let cj: chenji_he;
cj = {
    yuwen: 135,
    shuxue: 149,
    waiyu: 150
}

console.log(cj);

