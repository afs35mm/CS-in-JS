/*
*
* Insanely convoluted example that logs processing times for a given amount of threads and however long each task takes
*
var bh = new BinaryHeap();
bh.push({
    finishTime: 3,
    idx: 3
});
bh.push({
    finishTime: 3,
    idx: 2
});
bh.push({
    finishTime: 3,
    idx: 1
});
bh.push({
    finishTime: 3,
    idx: 0
});
console.log(bh.pop());
console.log(bh.pop());
console.log(bh.pop());
*
*
*
*/

function BinaryHeap() {
    this.heap = [];
}

BinaryHeap.prototype.push = function(obj) {
    this.heap.push(obj);
    this.bubbleUp(this.heap.length - 1);
};

BinaryHeap.prototype.pop = function(obj) {
    var result = this.heap[0];
    var end = this.heap.pop();
    if (this.heap.length > 0) {
        this.heap[0] = end;
        this.sinkDown(0);
    }
    return result;
};

BinaryHeap.prototype.bubbleUp = function(i) {
    var element = this.heap[i];
    while (i > 0) {
        var parentIndex = Math.floor((i + 1) / 2) - 1,
        parentNode = this.heap[parentIndex];
        if (parentNode.finishTime < element.finishTime ||
            (parentNode.finishTime === element.finishTime && parentNode.idx < element.idx)){
            break;
        }
        this.swap(parentIndex, i);
        i = parentIndex;
    }
};

BinaryHeap.prototype.swap = function(idx1, idx2) {
    var tmp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = tmp;
};

BinaryHeap.prototype.sinkDown = function(i) {
    var i = 0;
    while( 2 * i <= this.heap.length) {
        var leftIdx = 2 * i + 1;
        var rightIdx = 2 * i + 2;

        // this rearranges the nodes index (in a very convoluted way) just switched the correct idx so the blow sinkdown loop is correct
        if ((this.heap[leftIdx] && this.heap[rightIdx])
            && (this.heap[i].finishTime === this.heap[leftIdx].finishTime)
            && (this.heap[i].finishTime === this.heap[rightIdx].finishTime)) {
            var idxArr = [];
            idxArr.push(this.heap[i].idx);
            idxArr.push(this.heap[leftIdx].idx);
            idxArr.push(this.heap[rightIdx].idx);
            idxArr.sort(function(a, b){
                return a - b;
            });
            var smallest = idxArr.shift();
            var middle = idxArr.shift();
            var largest = idxArr.shift();

            this.heap[i].idx = smallest;
            this.heap[leftIdx].idx = middle;
            this.heap[rightIdx].idx = largest;
        } else if (this.heap[leftIdx] && this.heap[i].finishTime === this.heap[leftIdx].finishTime
            && this.heap[i].idx > this.heap[leftIdx].idx) {
            this.swap(i, leftIdx);
        } else if (this.heap[rightIdx] && this.heap[i].finishTime === this.heap[rightIdx].finishTime
            && this.heap[i].idx > this.heap[rightIdx].idx) {
            this.swap(i, rightIdx);
        }
        else if (this.heap[rightIdx] && this.heap[rightIdx] && this.heap[leftIdx].finishTime === this.heap[rightIdx].finishTime
            && this.heap[leftIdx].idx > this.heap[rightIdx].idx) {
            this.swap(leftIdx, rightIdx);
        }

        if ((this.heap[leftIdx] && this.heap[i]['finishTime'] > this.heap[leftIdx]['finishTime']) &&
            this.heap[rightIdx] && (this.heap[i]['finishTime'] > this.heap[rightIdx]['finishTime'])) {
            if (this.heap[leftIdx]['finishTime'] > this.heap[rightIdx]['finishTime']) {
                this.swap(i, rightIdx);
                i = rightIdx;
            } else {
                this.swap(i, leftIdx);
                i = leftIdx;
            }
        } else if (this.heap[rightIdx] && (this.heap[i]['finishTime'] > this.heap[rightIdx]['finishTime'])) {
            this.swap(i, rightIdx);
            i = rightIdx;
        } else if (this.heap[leftIdx] && (this.heap[i]['finishTime'] > this.heap[leftIdx]['finishTime'])) {
            this.swap(i, leftIdx);
            i = leftIdx;
        } else {
            break;
        }
    }
};


var data = [
    [2],
    [1, 2, 3, 4, 5],
];

var data = [
    [4],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var data = [
    [6],
    [6, 9, 5, 5, 9, 2, 4, 3],
];

function getProcessingTimes(threads, input) {
    var bh = new BinaryHeap();
    var time = 0;
    var counter = 0;
    var result = '';
    for(var i = 0; i < input.length; i++) {
        item = input[i];
        if (bh.heap.length < threads) {
            console.log(bh.heap.length + ' ' + time);
            bh.push({
                idx: bh.heap.length,
                finishTime: time + item,
            });
        } else {
            var min = bh.pop();
            var clearIndex = min.idx;
            time = min.finishTime;
            console.log(clearIndex + ' ' + time);
            bh.push({
                idx: clearIndex,
                finishTime: item + time,
            });
        }
    };
}

getProcessingTimes(data[0], data[1]);
