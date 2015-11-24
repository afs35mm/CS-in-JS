'use strict';

var binaryHeap = require('./binary-heap.js');

var minHeap = function() {
  binaryHeap.apply(this, arguments);
};

minHeap.prototype = new binaryHeap();

minHeap.prototype.shouldSwap = function(childData, parentData) {
  return childData < parentData;
};

module.exports = minHeap;
