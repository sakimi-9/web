let buf = Buffer.alloc(10);


let buf_1 = Buffer.allocUnsafe(5);
console.log(buf_1);

let buf_2 = Buffer.from('hello');
console.log(buf_2);
let buf_3 = Buffer.from([34, 45, 56, 67]);
console.log(buf_3);

buf[1] = 3;
console.log(buf);

console.log(buf_3.toString());

let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4);
console.log(buf_4.toString());

console.log(buf_2[0].toString(2));

console.log(Buffer.from('iloveyou'));