// 定义一个计算器类
class Calculator {
    constructor(precision = 2) {
        this.precision = precision;
    }

    add(a, b) {
        return Number((a + b).toFixed(this.precision));
    }

    multiply(a, b) {
        return Number((a * b).toFixed(this.precision));
    }
}

// 定义一个格式化函数
function formatNumber(num, type = 'default') {
    switch (type) {
        case 'currency':
            return `¥${num.toFixed(2)}`;
        case 'percentage':
            return `${(num * 100).toFixed(1)}%`;
        default:
            return num.toString();
    }
}

// 导出
module.exports = {
    Calculator,
    formatNumber
};
