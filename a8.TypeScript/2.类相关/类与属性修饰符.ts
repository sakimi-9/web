class Person {
    // 属性
    name: string;
    age: number;
    gender: '男' | '女';

    // 构造函数
    constructor(name: string, age: number, gender: '男' | '女') {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    // 方法
    sayHello(): void {
        console.log(`大家好,我是${this.name},今年${this.age}岁,性别${this.gender}`);
    }

    study(course: string): string {
        return `${this.name}正在学习${course}课程`;
    }
}

// 创建实例
const p1 = new Person('张三', 18, '男');
p1.sayHello();
console.log(p1.study('TypeScript'));
// 创建子类继承Person类
class Student extends Person {
    // 新增属性
    grade: string;

    // 构造函数
    constructor(name: string, age: number, gender: '男' | '女', grade: string) {
        // 调用父类构造函数
        super(name, age, gender);
        this.grade = grade;
    }

    // 重写父类方法
    sayHello(): void {
        console.log(`大家好,我是${this.name},今年${this.age}岁,性别${this.gender},就读于${this.grade}`);
    }

    // 新增方法
    exam(): string {
        return `${this.name}正在参加考试`;
    }
}

// 创建子类实例
const s1 = new Student('李四', 16, '女', '高一');
s1.sayHello();
console.log(s1.study('数学')); // 调用继承的方法
console.log(s1.exam()); // 调用新增的方法


//使用属性修饰符，简化代码，四种修饰符都写一次
class Teacher {
    // public 修饰符,公共属性,可以在任何地方访问,默认所有属性都是public

    // protected 修饰符,受保护属性,只能在类内部和子类中访问

    // private 修饰符,私有属性,只能在类内部访问

    // readonly 修饰符,只读属性,不能被修改

    // 使用构造函数简化代码,参数前加修饰符可以自动生成属性并赋值
    constructor(public name: string, readonly salary: number, protected subject: string, private id: number) {
    }

    // 公共方法
    teach(): string {
        return `${this.name}老师正在教${this.subject}`;
    }

    // 私有方法
    private getSalary(): number {
        return this.salary;
    }

    // 受保护方法
    protected getInfo(): string {
        return `工号:${this.id}, 姓名:${this.name}, 学科:${this.subject}`;
    }
}

// 创建实例
const t1 = new Teacher('王老师', 8000, '语文', 10001);
console.log(t1.teach());
// console.log(t1.salary); // 错误,私有属性不能在类外部访问
// console.log(t1.getSalary()); // 错误,私有方法不能在类外部访问
// console.log(t1.subject); // 错误,受保护属性不能在类外部访问
// console.log(t1.getInfo()); // 错误,受保护方法不能在类外部访问
// t1.id = 10002; // 错误,只读属性不能被修改

// 抽象类,使用 abstract 关键字声明
abstract class Animal {
    // 具体属性
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    // 具体方法
    eat(): string {
        return `${this.name}正在吃东西`;
    }

    // 抽象方法,使用 abstract 关键字声明,没有方法体
    abstract makeSound(): string;
}

// 具体类必须实现抽象类中的所有抽象方法
class Dog extends Animal {
    makeSound(): string {
        return `${this.name}:汪汪汪!`;
    }
    //对父类 具体方法 的覆盖
    override eat(): string {
        return `${this.name}正在吃东西`;
    }
}

// 创建实例
const dog = new Dog('小黑');
console.log(dog.eat()); // 调用具体方法
console.log(dog.makeSound()); // 调用实现的抽象方法
// const animal = new Animal('动物'); // 错误,不能创建抽象类的实例
