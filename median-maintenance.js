var request = require('request');
var MinHeap = require('./min-heap.js');
var MaxHeap = require('./max-heap.js');

// request.get('http://spark-public.s3.amazonaws.com/algo1/programming_prob/Median.txt', function (error, response, body) {
//request.get('http://spark-public.s3.amazonaws.com/algo1/programming_prob/Median.txt', function (error, response, body) {
request.get('https://dl.dropboxusercontent.com/u/17526827/coursera/hw-6-2.txt', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var intsArr = body.split('\n');
        intsArr.splice(-1);

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

                if (lowHeap.heapSize() + 2 === highHeap.heapSize()) {
                    lowHeap.add(highHeap.removeHead());
                } else if (lowHeap.heapSize() === highHeap.heapSize() + 2) {
                    highHeap.add(lowHeap.removeHead());
                }

                console.log(lowHeap.getHeap(), highHeap.getHeap());

                //now find median
                if (lowHeap.heapSize() === highHeap.heapSize()){
                    median = lowHeap.removeHead();
                    lowHeap.add(median);
                } else if (lowHeap.heapSize() < highHeap.heapSize()) {
                    median = highHeap.removeHead();
                    highHeap.add(median);
                } else {
                    median = lowHeap.removeHead();
                    lowHeap.add(median);
                }
            }

            console.log(median);

            medianSum += median;

        }

        console.log(medianSum);
    }
});
