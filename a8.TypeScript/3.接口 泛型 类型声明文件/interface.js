"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exportJS_1 = require("./exportJS");
// 实现接口的类,使用泛型
class Student {
    constructor(name, age, score, grade, id, classroom) {
        this.name = name;
        this.age = age;
        this.score = score;
        this.grade = grade;
        this.id = id;
        this.classroom = classroom;
        this.calculator = new exportJS_1.Calculator();
    }
    study() {
        const formattedScore = typeof this.score === 'number'
            ? (0, exportJS_1.formatNumber)(this.score, 'percentage')
            : this.score;
        return `${this.name}同学正在${this.classroom}教室学习,成绩为${formattedScore}`;
    }
    // 私有方法获取学号
    getId() {
        return this.id;
    }
    // 计算平均分（仅当score为number类型时可用）
    calculateAverageScore(otherScore) {
        if (typeof this.score === 'number') {
            return this.calculator.add(this.score, otherScore) / 2;
        }
        return null;
    }
}
// 创建实例,指定泛型类型为number
const s1 = new Student("张三", 18, 0.95, 1, 10001, "301");
console.log(s1.study()); // 输出：张三同学正在301教室学习,成绩为95.0%
console.log(s1.calculateAverageScore(0.85)); // 输出：0.9
// 创建实例,指定泛型类型为string 
const s2 = new Student("李四", 19, "A", "一年级", 10002, "302");
console.log(s2.study()); // 输出：李四同学正在302教室学习,成绩为A
console.log(s2.calculateAverageScore(90)); // 输出：null
