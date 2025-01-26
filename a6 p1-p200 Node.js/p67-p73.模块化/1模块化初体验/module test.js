function blowing() {
    console.log('风吹...');
}
function run() {
    console.log('跑起来，一直向前');
}

//暴露数据 （导出数据）
module.exports = { blowing, run }