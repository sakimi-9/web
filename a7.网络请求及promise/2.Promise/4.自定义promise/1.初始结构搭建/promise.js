//声明构造函数 
//这边构造函数的形参是那边调用方的形参的形参    那边的形参是这边的实参
function Promise(executor) {
    //搭建resolve与reject结构
    //声明resolve与reject函数  函数名可以写成其他的,与下面executor的对应就行

    //用this 添加promise对象的两个属性  PromiseState PromiseResult
    this.PromiseState = 'Pending';
    this.PromiseResult = null;
    //声明 回调函数属性 用于应对异步任务,对象状态为Pending时,储存回调直至等待完成执行异步
    this.callback = {};//
    //保存实例对象的this值  否则跟内层函数调用时,未定义,this会默认指向Window
    const that = this;//self _this that 一般用这些值来保存this值
    function resolve(data) {//那边传入实参,所以这里要写形参
        //只能改变一次对象
        //用判断语句解决此特性  如果对象状态已不为默认状态,则return 暂停函数向下执行,以保不再重复修改对象
        if (that.PromiseState !== 'Pending') return;

        //执行resolve改变对象的属性
        that.PromiseState = 'fullfilled';//resolved
        that.PromiseResult = data;

        //应对异步情况,将值传入
        if (that.callback.onResolved) {
            that.callback.onResolved(data)
        }

    }

    function reject(data) {
        //用判断语句解决此特性  如果对象状态已不为默认状态,则return 暂停函数向下执行,以保不再重复修改对象
        if (that.PromiseState !== 'Pending') return;

        //执行reject改变对象的属性
        that.PromiseState = 'rejected';
        that.PromiseResult = data;

        //应对异步情况,将值传入
        if (that.callback.onRejected) {
            that.callback.onRejected(data)
        }
    }

    //用try-catch语句来适应 promise抛出异常      先try执行,区间内有异常则捕获传递到catch,进行错误处理
    try {
        //Promise构造器的特性  立刻同步执行里面的函数
        executor(resolve, reject);//所以这里要调用构造器函数   这里面是形参,与那边的 可以不同名,与上面的同名就行

    } catch (error) {//错误处理,html那边的异常会传递到此形参中
        //这里不要写if判断  reject函数里面有
        reject(error);
    }

}
//因为这个构造函数原型链上,本身就没有.then方法,所以那边 p 的隐式原型链上无法调用.then
//用原型链添加.then方法(别用箭头函数,识别不了)    prototype(原型)       
Promise.prototype.then = function (onResolved, onRejected) {//传入形参表的是左边index p.then()的实参  但获取的属性是通过上面来的

    //调用.then方法  按照对象状态,执行对应回调
    //添加属性用this,所以 对象状态通过this获取
    if (this.PromiseState === 'fullfilled') {
        //传入实参的是对象结果,也是通过this获取
        onResolved(this.PromiseResult);
    }
    if (this.PromiseState === 'rejected') {
        //传入实参的是对象结果,也是通过this获取
        onRejected(this.PromiseResult);
    }
    if (this.PromiseState === 'Pending') {//异步任务时,调用.then方法,对象是Pending状态
        // 储存回调函数属性到对象中  异步等待完成后  上面的resolve reject就能够调用 callback的对应回调
        this.callback = {//两种情况的回调都储存在回调函数属性中
            onResolved: onResolved,
            onRejected: onRejected
        }
    }


}