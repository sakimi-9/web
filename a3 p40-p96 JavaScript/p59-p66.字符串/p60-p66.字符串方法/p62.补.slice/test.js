//终端 node  文件全名     运行 
let str = "Hello,world!";//用字符串赋值只考虑" "里的字符串，用来包裹的引号不用管！
console.log('substring:' + str.substring(6));    // world!
console.log('substring:' + str.substring(6, 12));// world!
console.log('substring:' + str.substring(12, 6));// world!


console.log('slice:' + str.slice(0, 5));//Hello
console.log('slice:' + str.slice(6));//world!
console.log('slice:' + str.slice(-2));//d!
console.log('slice:' + str.slice(-1, -2));//
console.log('slice:' + str.slice(-3, -1));//ld