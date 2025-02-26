// 定义格式化类型
type FormatType = 'default' | 'currency' | 'percentage';

// 声明计算器类
declare class Calculator {
    private precision: number;
    constructor(precision?: number);
    add(a: number, b: number): number;
    multiply(a: number, b: number): number;
}

// 声明格式化函数
declare function formatNumber(num: number, type?: FormatType): string;

// 导出声明
export {
    Calculator,
    formatNumber,
    FormatType
}; 