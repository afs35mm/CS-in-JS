var request = require('request');
var heap = require('./heap.js');

request.get('http://spark-public.s3.amazonaws.com/algo1/programming_prob/Median.txt', function (error, response, body) {
//request.get('http://spark-public.s3.amazonaws.com/algo1/programming_prob/Median.txt', function (error, response, body) {
//request.get('https://dl.dropboxusercontent.com/u/17526827/coursera/test10000.txt', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var intsArr = body.split('\n');
        intsArr.splice(-1);

        var lowHeap = new heap(),
            highHeap = new heap(),
            medians = [],
            medianSum = 0,
            median = null;

        console.log(intsArr.length);

        for (var i = 0; i < intsArr.length; i ++){
            intsArr[i] = parseInt(intsArr[i]);
            var target = intsArr[i];

            if (!median) {
                median = target;
                lowHeap.push(target);
            } else {

                if (target < median) {
                    lowHeap.push(target);
                } else {
                    highHeap.push(target);
                }

                if (lowHeap.size() + 2 === highHeap.size()) {
                    var local = highHeap.getMin();
                    lowHeap.push(local);
                } else if (lowHeap.size() === highHeap.size() + 2) {
                    var local = lowHeap.pop();
                    highHeap.push(local);
                }
            }

            // now find median
            if (lowHeap.size() === highHeap.size()){
                median = lowHeap.pop();
                lowHeap.push(median);
            } else if (lowHeap.size() < highHeap.size()) {
                median = highHeap.getMin();
                highHeap.push(median);
            } else {
                median = lowHeap.pop();
                lowHeap.push(median);
            }
            console.log(median);
            medianSum += median;
            //console.log(intsArr[i]);
            //medians.push(median);
        }
        //console.log(medians);
        console.log(medianSum);
        //console.log(medianSum % 10000);


    }
});
