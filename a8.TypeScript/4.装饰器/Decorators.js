"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function SimpleClassDecorator(target) {
    console.log("类装饰器被调用");
    target.prototype.decorated = true; // 为类添加一个属性
}
// 使用装饰器
let MyClass = class MyClass {
    constructor() {
        console.log("MyClass 实例被创建");
    }
};
MyClass = __decorate([
    SimpleClassDecorator,
    __metadata("design:paramtypes", [])
], MyClass);
// 测试装饰器
console.log(MyClass.prototype); // 输出: true
/*
  参数说明：
    ○ target: 对于静态属性来说值是类，对于实例属性来说值是类的原型对象。
    ○ propertyKey: 属性名。
*/
function Demo(target, propertyKey) {
    console.log(target, propertyKey);
}
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
__decorate([
    Demo,
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    Demo,
    __metadata("design:type", Number)
], Person.prototype, "age", void 0);
__decorate([
    Demo,
    __metadata("design:type", String)
], Person, "school", void 0);
const p1 = new Person('张三', 18);
// 方法装饰器
function MethodDecorator(target, propertyKey, descriptor) {
    console.log(`方法装饰器被调用: ${propertyKey}`);
    // 在方法执行前后添加日志
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`调用方法: ${propertyKey}，参数: ${JSON.stringify(args)}`);
        const result = originalMethod.apply(this, args);
        console.log(`方法返回值: ${result}`);
        return result;
    };
}
// 参数装饰器
function ParameterDecorator(target, propertyKey, parameterIndex) {
    console.log(`参数装饰器被调用: ${propertyKey} 的参数索引 ${parameterIndex}`);
}
// 使用方法装饰器和参数装饰器的示例类
class Example {
    greet(name) {
        return `你好, ${name}!`;
    }
}
__decorate([
    MethodDecorator,
    __param(0, ParameterDecorator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Example.prototype, "greet", null);
const example = new Example();
example.greet('张三'); // 调用示例
// 装饰器工厂
function Logger(prefix) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            console.log(`${prefix}: 调用方法: ${propertyKey}，参数: ${JSON.stringify(args)}`);
            const result = originalMethod.apply(this, args);
            console.log(`${prefix}: 方法返回值: ${result}`);
            return result;
        };
    };
}
// 使用装饰器工厂
class User {
    login(username, password) {
        return `登录成功: ${username}`;
    }
}
__decorate([
    Logger('用户模块'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], User.prototype, "login", null);
const user = new User();
user.login('张三', '123456');
class User2 {
    login(username, password) {
        return `登录成功: ${username}`;
    }
}
__decorate([
    Logger('用户模块'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], User2.prototype, "login", null);
const user2 = new User2();
user2.login('张三', '123456');
// 装饰器组合
