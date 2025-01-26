function blowing() {
    console.log('风吹...');
}
function run() {
    console.log('跑起来，一直向前');
}

//暴露数据 （导出数据） module.exports=name / {name}
// module.exports = blowing
module.exports = { blowing, run }

//暴露数据 也可以用 exports.name=value(/name)
//是将value在exports对象里创建同名属性并赋值
// exports.blowing = blowing


//exports===module.exports 为true
//因为 exports=module.exports={}
//但 module.exports可以暴露任何数据，exports不行
//因为 require引入直接指向module.exports
// exports = 'sss'//{}
// module.exports = 'aaa'//aaa