import { Observable } from "rxjs";


//案例1   核心逻辑
// 创建一个 Observable 
//  Observable 被观察者（博主）  subscriber 订阅（关注）   next （流式推送）  complete（推送完毕通知）
const observable = new Observable(subscriber => {
    //相当于 对所有 订阅者-流式推送
    subscriber.next(1); // 发出数据 1
    subscriber.next(2); // 发出数据 2
    subscriber.next(3); // 发出数据 3

    // 1秒后发出数据 4，并通知完成    定时推送
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});

// 订阅 Observable    博主的订阅者
observable.subscribe({
    next: (value) => {  //收到推送进行显示
        console.log(value); // 每次收到数据时打印
    },
    complete: () => {
        console.log("Observable 完成"); // 当 Observable 完成时打印
    }
});


//案例2   操作符
import { interval, take } from "rxjs";
import { map, filter } from 'rxjs/operators';

// interval(500)：创建一个每 500 毫秒发出一次递增数字的 Observable。
// pipe：用于将多个操作符串联起来，对数据流进行处理。
// map：将数据转换为另一种形式。
// filter：过滤数据，只保留符合条件的数据。
// subscribe：订阅处理后的数据流。

// 创建一个每 500 毫秒发出一次数据的 Observable
const subs = interval(500).pipe(
    map(v => ({ num: v })), // 将数据转换为对象形式
    filter(v => (v.num % 2 == 0)) // 过滤出偶数
).subscribe((e) => {   //直接推送给订阅者并显示
    console.log(e); // 打印每个偶数
    if (e.num == 10) {
        subs.unsubscribe(); // 当数字达到 10 时取消订阅
    }
});


// //案例3   事件处理 Dom事件    这个要处理后放前端，后端没有dom
// import { fromEvent } from "rxjs";

// // fromEvent：创建一个从 DOM 事件中发出数据的 Observable。
// // map：将事件对象转换为目标元素。
// // subscribe：订阅事件，处理每次点击

// // 监听 DOM 的点击事件
// const dom = fromEvent(document, 'click').pipe(
//     map(e => e.target) // 将事件对象映射为事件的目标元素
// ).subscribe((e) => {  //直接推送给订阅者并显示
//     console.log(e); // 打印点击的目标元素
// });