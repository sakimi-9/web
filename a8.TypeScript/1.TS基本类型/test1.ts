let a: number = 3;
let str: string = 'STR';
// 定义数组
let arr: (number | string)[] = [3, 43, 5, 'aewd'];
// 定义元组
let tup: [number, string, string] = [2, '2', 'tuple'];

console.log(a, '\r\n');

console.log(str, '\r\n');

console.log(arr, '\r\n');

console.log(tup, '\r\n');

let a1: any;//等义 let a1   但具有破坏性，会破坏其他变量的类型检查   
a1 = 1;
a1 = "2";
a1 = null;
a1 = [1];
let a2: string;
a2 = a1;//己破坏 所以 没有因类型检查报错
console.log(typeof (a2));//所以 object 也没问题

let a11: unknown;//相当于安全的 any,不会破坏类型检查
// a22=a11;有类型检查 报错

let a3: string;

//2种断言方式 来确保赋值unknown类型变量时不报错
a3 = a11 as string;
a3 = <string>a11;
console.log(typeof (a3));


try {
    function f1(): never {
        throw new Error('程序报错中断执行！');
    }
    f1()
} catch {
    console.log('\r\n' + 'never 限制函数不能有任何返回值，所以此函数要么中止执行，要么无限循环');

}

function f2(): void {

}
console.log('void限制函数的返回值为空', f2(), '是可接受的一种空，但调⽤者也不应依赖其返回值进⾏任何操作!');
// if (f2()) {} 报错