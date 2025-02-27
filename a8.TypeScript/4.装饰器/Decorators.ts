function SimpleClassDecorator(target: Function) {
    console.log("类装饰器被调用");
    target.prototype.decorated = true; // 为类添加一个属性
}

// 使用装饰器
@SimpleClassDecorator
class MyClass {
    constructor() {
        console.log("MyClass 实例被创建");
    }
}

// 测试装饰器
console.log(MyClass.prototype); // 输出: true



/* 
  参数说明：
    ○ target: 对于静态属性来说值是类，对于实例属性来说值是类的原型对象。
    ○ propertyKey: 属性名。
*/

function Demo(target: object, propertyKey: string) {
    console.log(target, propertyKey)
}

class Person {
    @Demo name: string
    @Demo age: number
    @Demo static school: string

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

const p1 = new Person('张三', 18)


// 方法装饰器
function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`方法装饰器被调用: ${propertyKey}`);
    // 在方法执行前后添加日志
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`调用方法: ${propertyKey}，参数: ${JSON.stringify(args)}`);
        const result = originalMethod.apply(this, args);
        console.log(`方法返回值: ${result}`);
        return result;
    };
}

// 参数装饰器
function ParameterDecorator(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`参数装饰器被调用: ${propertyKey} 的参数索引 ${parameterIndex}`);
}

// 使用方法装饰器和参数装饰器的示例类
class Example {
    @MethodDecorator
    greet(@ParameterDecorator name: string) {
        return `你好, ${name}!`;
    }
}

const example = new Example();
example.greet('张三'); // 调用示例


// 装饰器工厂
function Logger(prefix: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            console.log(`${prefix}: 调用方法: ${propertyKey}，参数: ${JSON.stringify(args)}`);
            const result = originalMethod.apply(this, args);
            console.log(`${prefix}: 方法返回值: ${result}`);
            return result;
        };
    };
}

// 使用装饰器工厂
class User {
    @Logger('用户模块')
    login(username: string, password: string) {
        return `登录成功: ${username}`;
    }
}

const user = new User();
user.login('张三', '123456');

class User2 {
    @Logger('用户模块')
    login(username: string, password: string) {
        return `登录成功: ${username}`;
    }
}

const user2 = new User2();
user2.login('张三', '123456');


// 装饰器组合

//装饰器
function test1(target: Function) {
    console.log('test1')
}
//装饰器工厂
function test2() {
    console.log('test2工厂')
    return function (target: Function) {
        console.log('test2')
    }
}
//装饰器工厂
function test3() {
    console.log('test3工厂')
    return function (target: Function) {
        console.log('test3')
    }
}
//装饰器
function test4(target: Function) {
    console.log('test4')
}

@test1
@test2()
@test3()
@test4
class Person1 { }

/*
  控制台打印：
    test2工厂
    test3工厂
    test4
    test3
    test2
    test1
*/