var heap = require('./heap.js');

var bh = new heap();

bh.push(1);
bh.push(2);
bh.push(3);
bh.push(-4);
bh.push(7);
bh.push(8);
bh.push(98);
bh.push(0);

console.log(bh.arr());

console.log(bh.getMin());

console.log(bh.arr());

bh.push(99);
bh.push(100);
bh.push(90);
bh.push(80);
bh.push(40);

console.log(bh.arr());
console.log(bh.pop());
