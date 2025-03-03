// 定义类 A，用于表示一个简单的对象
class A {
    name: string; // 类 A 的属性，用于存储名称
    constructor(name: string) {
        this.name = name; // 构造函数初始化名称
    }
}

// 定义类 C，与类 A 类似，用于表示另一个简单的对象
class C {
    name: string; // 类 C 的属性，用于存储名称
    constructor(name: string) {
        this.name = name; // 构造函数初始化名称
    }
}

// 定义一个 IoC 容器，用于管理对象的创建和依赖关系   通过容器的实例来注入与调用类的实例，来实现控制反转
class Container {
    modeuls: any; // 用于存储对象实例的集合
    constructor() {
        this.modeuls = {}; // 初始化为空对象
    }

    // 提供一个方法，用于向容器中注册对象实例    注入
    provide(key: string, modeuls: any) {
        this.modeuls[key] = modeuls; // 将对象实例存储到容器中，以 key 为标识
    }

    // 提供一个方法，用于从容器中获取对象实例    调用
    get(key: string) {
        return this.modeuls[key]; // 根据 key 获取对应的对象实例
    }
}

// 创建一个 IoC 容器实例
const mo = new Container();

// 向容器中注册类 A 和类 C 的实例
mo.provide('a', new A('注入类A')); // 注册类 A 的实例，标识为 'a'
mo.provide('c', new C('注入类B')); // 注册类 C 的实例，标识为 'c'

// 定义类 B，它依赖于类 A 和类 C 的实例
class B {
    a: any; // 类 B 的属性，用于存储类 A 的实例
    c: any; // 类 B 的属性，用于存储类 C 的实例

    // 类 B 的构造函数接收一个 IoC 容器作为参数
    constructor(container: Container) {
        this.a = container.get('a'); // 从容器中获取类 A 的实例，并赋值给类 B 的属性 a
        this.c = container.get('c'); // 从容器中获取类 C 的实例，并赋值给类 B 的属性 c
    }
}

// 创建类 B 的实例，并传入 IoC 容器
new B(mo); // 类 B 的实例通过容器获取其依赖的类 A 和类 C 的实例 

// 输出类 B 的实例
console.log(new B(mo));
