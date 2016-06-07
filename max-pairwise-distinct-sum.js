/*
* From: Task.
* The goal of this problem is to represent a given positive integer n
* as a sum of as many pairwise distinct positive integers as possible.
*
* Ex: N = a + b + c + d +... x
* 6: [3,2,1]
* 2: [2]
* 8: [1,2,5]
*/


var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
var lines = [];
var totalLinesNeeded = 1;

rl.question('Enter a number to get the summands: ', function(line){
    var summands = getSegmentPoints(parseInt(line));
    // console.log(summands.length);
    console.log(summands.join(' '));
    rl.close()
});

function getSegmentPoints(num) {
    var usedNums = [];
    var counter = 1;
    var remainder = num;
    while (remainder > 0) {
        if (2* counter >= remainder) {

            counter = remainder;
        } else {
            //remainder -= counter;
        }

        remainder -= counter;
        usedNums.push(counter);
        counter++;

    }
    return usedNums;
}


