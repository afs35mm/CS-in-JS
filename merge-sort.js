var helpers = require('./helpers');
var unsortedArr = [5, 3, 8, 9, 1, 7, 0, 2, 6, 4];

function merge(arr) {
    if (arr.length <= 1) {
        return arr;
    } else {
        var midpoint = Math.floor(arr.length / 2);
        //Array.splice(index, howMany, itemToInsert1, itemToInsert2, ... , itemToInsertN)
        var fistHalfArr = arr.splice(0, midpoint);
        return helpers.mergeSorted(merge(fistHalfArr), merge(arr));
    }
}

console.log(merge(unsortedArr));
