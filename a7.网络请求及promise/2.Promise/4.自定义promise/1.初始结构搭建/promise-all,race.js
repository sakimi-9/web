//声明构造类
class MyPromise {
    // 定义Promise的三种状态常量
    static PENDING = 'pending';    //等待
    static FULFILLED = 'fulfilled';//成功
    static REJECTED = 'rejected';  //失败

    //构造器函数  形参executor是调用时传入的回调函数
    constructor(executor) {
        //添加promise对象的属性
        // 初始化状态为pending
        this.status = MyPromise.PENDING;
        // 存储成功的值
        this.value = undefined;
        // 存储失败的原因
        this.reason = undefined;
        // 存储成功状态的回调函数数组 用于处理异步
        this.successCallback = [];
        // 存储失败状态的回调函数数组 用于处理异步
        this.failCallback = [];

        //resolve方法  用箭头函数保证this指向实例对象
        let resolve = (value) => {
            //状态只能改变一次
            if (this.status !== MyPromise.PENDING) return;
            //将状态改为成功
            this.status = MyPromise.FULFILLED;
            //保存成功的值
            this.value = value;
            //异步任务成功后 依次调用成功回调
            while (this.successCallback.length) {
                this.successCallback.shift()(this.value);
            }
        }

        //reject方法
        let reject = (reason) => {
            //状态只能改变一次
            if (this.status !== MyPromise.PENDING) return;
            //将状态改为失败
            this.status = MyPromise.REJECTED;
            //保存失败的原因
            this.reason = reason;
            //异步任务失败后 依次调用失败回调
            while (this.failCallback.length) {
                this.failCallback.shift()(this.reason);
            }
        }

        try {
            //立即同步执行executor函数
            executor(resolve, reject);
        } catch (error) {
            //捕获执行器错误
            reject(error);
        }
    }

    //添加then方法
    then(successCallback, failCallback) {
        //参数可选 处理空参数的情况
        successCallback = successCallback ? successCallback : value => value;
        failCallback = failCallback ? failCallback : reason => { throw reason };

        //返回新的Promise实现链式调用
        let promise2 = new MyPromise((resolve, reject) => {
            //成功状态
            if (this.status === MyPromise.FULFILLED) {
                //异步执行
                setTimeout(() => {
                    try {
                        //执行成功回调
                        let x = successCallback(this.value);
                        //传递给下一个then
                        resolve(x);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            } else if (this.status === MyPromise.REJECTED) {
                //失败状态
                setTimeout(() => {
                    try {
                        //执行失败回调
                        let x = failCallback(this.reason);
                        //传递给下一个then
                        resolve(x);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            } else {
                //等待状态 - 处理异步任务
                //将回调函数存储到数组中
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value);
                            resolve(x);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
                this.failCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.reason);
                            resolve(x);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    }

    //添加静态resolve方法
    static resolve(value) {
        //如果参数是MyPromise实例，直接返回
        if (value instanceof MyPromise) {
            return value;
        }
        //将普通值转换为MyPromise对象
        return new MyPromise(resolve => resolve(value));
    }

    //添加静态all方法
    static all(array) {
        //存储结果数组
        let result = [];
        //计数器
        let index = 0;

        return new MyPromise((resolve, reject) => {
            //添加数据的函数
            function addData(key, value) {
                //按照原数组的顺序存储结果
                result[key] = value;
                //计数器加1
                index++;
                //所有的Promise都成功才返回结果数组
                if (index === array.length) {
                    resolve(result);
                }
            }

            //遍历数组
            for (let i = 0; i < array.length; i++) {
                let current = array[i];
                if (current instanceof MyPromise) {
                    //Promise对象，调用then方法
                    current.then(value => addData(i, value), reason => reject(reason));
                } else {
                    //普通值，直接添加到结果数组
                    addData(i, current);
                }
            }
        });
    }

    //添加静态race方法
    static race(array) {
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < array.length; i++) {
                let current = array[i];
                if (current instanceof MyPromise) {
                    current.then(value => resolve(value), reason => reject(reason));
                } else {
                    resolve(current);
                }
            }
        });
    }


}
