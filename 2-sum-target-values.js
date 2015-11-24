var request = require('request');

request.get('https://d396qusza40orc.cloudfront.net/algo1%2Fprogramming_prob%2F2sum.txt', function (error, response, body) {
//request.get('https://dl.dropboxusercontent.com/u/17526827/coursera/hw-6.txt', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var startTime = new Date().getTime();

        var intsArr = body.split('\n');

        for(var x = 0; x < intsArr.length; x++){
            intsArr[x] = parseInt(intsArr[x]);
        }

        var parseTime = new Date().getTime();
        console.log( ((parseTime - startTime) / 1000 ) + ' seconds to put into object');

        var sumsObj = {};

        for(var j = 0; j < intsArr.length; j++) {
            console.log('starting loop for ' + j + ' position')
            for(var l = j; l < intsArr.length; l++) {
                var sum = intsArr[j] + intsArr[l];
                if (sum >= -10000 && sum <= 10000 && !sumsObj[sum] && intsArr[j] !== intsArr[l]) { 
                    sumsObj[sum] = true;
                }
            }
        }
        console.log(Object.keys(sumsObj).length);
    }
});
