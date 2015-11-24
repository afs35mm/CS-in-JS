var MinHeap = require('./min-heap.js');
var MaxHeap = require('./max-heap.js');

var lowHeap = new MaxHeap();
lowHeap.add(1);
lowHeap.add(2);
lowHeap.add(3);
lowHeap.add(4);
var head = lowHeap.removeHead();
console.log(head);

var highHeap = new MinHeap();
highHeap.add(1);
highHeap.add(2);
highHeap.add(3);
highHeap.add(4);

console.log(highHeap.getHeap());
var head = highHeap.removeHead();
console.log(head);
console.log(highHeap.getHeap());
highHeap.add(head);
console.log(highHeap.getHeap());
