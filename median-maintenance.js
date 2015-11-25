var fs = require('fs');
//var request = require('request');
var MinHeap = require('./min-heap.js');
var MaxHeap = require('./max-heap.js');

//request.get('http://spark-public.s3.amazonaws.com/algo1/programming_prob/Median.txt', function (error, response, body) {
fs.readFile('./data/median-maintence-data-xl.txt', function(err, data){
    if (!err) {
        var intsStr = data.toString().trim();
        var intsArr = intsStr.split('\n');

        var lowHeap = new MaxHeap(),
            highHeap = new MinHeap(),
            medians = [],
            medianSum = 0,
            median = null;

        for (var i = 0; i < intsArr.length; i ++){
            intsArr[i] = parseInt(intsArr[i]);
            var target = intsArr[i];

            if (!median) {
                median = target;
                lowHeap.add(target);
            } else {

                if (target < median) {
                    lowHeap.add(target);
                } else {
                    highHeap.add(target);                    
                }

                if (lowHeap.heapSize() > highHeap.heapSize() + 1) {
                    highHeap.add(lowHeap.removeHead());
                } else if (highHeap.heapSize() > lowHeap.heapSize() + 1) {
                    lowHeap.add(highHeap.removeHead());
                }

                if (lowHeap.heapSize() === highHeap.heapSize() || lowHeap.heapSize() > highHeap.heapSize()) {
                    median = lowHeap.getHeap()[0];
                } else if (highHeap.heapSize() > lowHeap.heapSize()) {
                    median = highHeap.getHeap()[0];
                }

            }

            medianSum += median;

        }
        console.log(medianSum);
        //console.log(medianSum % 10000);
    }   
});
