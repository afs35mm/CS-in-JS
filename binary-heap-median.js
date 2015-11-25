var binaryHeap = require('./heap');

var bh = binaryHeap();
bh.push(5);
bh.push(34);
bh.push(16);

console.log(bh.pop());
console.log("number in heap: " + bh.size()) // 2
console.log(bh.pop());