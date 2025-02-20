const hello = 'HELLO';
const hi = 'HI';
const a = 1;
const func = (width, height) => {
    let juxing_s = width + height;
    return juxing_s;
}



export { hello, hi, func };//导出对象  |  将单个或多个变量导出
export default a;//导出默认变量  |  将单个变量导出 ,引入时可用其他名字  ,每个导出文件只能用一次
export const b = 2;//将声明赋值的变量导出
