var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    // 构造函数
    function Person(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    // 方法
    Person.prototype.sayHello = function () {
        console.log("\u5927\u5BB6\u597D,\u6211\u662F".concat(this.name, ",\u4ECA\u5E74").concat(this.age, "\u5C81,\u6027\u522B").concat(this.gender));
    };
    Person.prototype.study = function (course) {
        return "".concat(this.name, "\u6B63\u5728\u5B66\u4E60").concat(course, "\u8BFE\u7A0B");
    };
    return Person;
}());
// 创建实例
var p1 = new Person('张三', 18, '男');
p1.sayHello();
console.log(p1.study('TypeScript'));
// 创建子类继承Person类
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    // 构造函数
    function Student(name, age, gender, grade) {
        // 调用父类构造函数
        var _this = _super.call(this, name, age, gender) || this;
        _this.grade = grade;
        return _this;
    }
    // 重写父类方法
    Student.prototype.sayHello = function () {
        console.log("\u5927\u5BB6\u597D,\u6211\u662F".concat(this.name, ",\u4ECA\u5E74").concat(this.age, "\u5C81,\u6027\u522B").concat(this.gender, ",\u5C31\u8BFB\u4E8E").concat(this.grade));
    };
    // 新增方法
    Student.prototype.exam = function () {
        return "".concat(this.name, "\u6B63\u5728\u53C2\u52A0\u8003\u8BD5");
    };
    return Student;
}(Person));
// 创建子类实例
var s1 = new Student('李四', 16, '女', '高一');
s1.sayHello();
console.log(s1.study('数学')); // 调用继承的方法
console.log(s1.exam()); // 调用新增的方法
//使用属性修饰符，简化代码，四种修饰符都写一次
var Teacher = /** @class */ (function () {
    // public 修饰符,公共属性,可以在任何地方访问,默认所有属性都是public
    // protected 修饰符,受保护属性,只能在类内部和子类中访问
    // private 修饰符,私有属性,只能在类内部访问
    // readonly 修饰符,只读属性,不能被修改
    // 使用构造函数简化代码,参数前加修饰符可以自动生成属性并赋值
    function Teacher(name, salary, subject, id) {
        this.name = name;
        this.salary = salary;
        this.subject = subject;
        this.id = id;
    }
    // 公共方法
    Teacher.prototype.teach = function () {
        return "".concat(this.name, "\u8001\u5E08\u6B63\u5728\u6559").concat(this.subject);
    };
    // 私有方法
    Teacher.prototype.getSalary = function () {
        return this.salary;
    };
    // 受保护方法
    Teacher.prototype.getInfo = function () {
        return "\u5DE5\u53F7:".concat(this.id, ", \u59D3\u540D:").concat(this.name, ", \u5B66\u79D1:").concat(this.subject);
    };
    return Teacher;
}());
// 创建实例
var t1 = new Teacher('王老师', 8000, '语文', 10001);
console.log(t1.teach());
// console.log(t1.salary); // 错误,私有属性不能在类外部访问
// console.log(t1.getSalary()); // 错误,私有方法不能在类外部访问
// console.log(t1.subject); // 错误,受保护属性不能在类外部访问
// console.log(t1.getInfo()); // 错误,受保护方法不能在类外部访问
// t1.id = 10002; // 错误,只读属性不能被修改
// 抽象类,使用 abstract 关键字声明
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    // 具体方法
    Animal.prototype.eat = function () {
        return "".concat(this.name, "\u6B63\u5728\u5403\u4E1C\u897F");
    };
    return Animal;
}());
// 具体类必须实现抽象类中的所有抽象方法
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.makeSound = function () {
        return "".concat(this.name, ":\u6C6A\u6C6A\u6C6A!");
    };
    Dog.prototype.eat = function () {
        return "".concat(this.name, "\u6B63\u5728\u5403\u4E1C\u897F");
    };
    return Dog;
}(Animal));
// 创建实例
var dog = new Dog('小黑');
console.log(dog.eat()); // 调用具体方法
console.log(dog.makeSound()); // 调用实现的抽象方法
// const animal = new Animal('动物'); // 错误,不能创建抽象类的实例
