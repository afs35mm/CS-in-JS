var helpers = require('./helpers');

var unsortedArr = [ 6, 1, 9, 25, 982, 34, 87, 20, 38, 99, 24, 74, 20 , 31];

var inverses = 0;

function mergeAndCountSorted (arr1, arr2) {

    var sortedArr =[];

    while(arr1.length && arr2.length){
        if (arr1[0] <= arr2[0]) {
            sortedArr.push(arr1.shift());
        } else {
            inverses += arr1.length;
            sortedArr.push(arr2.shift());
        }
    }

    if (arr1.length) {
        sortedArr = sortedArr.concat(arr1);
    }

    if (arr2.length) {
        sortedArr = sortedArr.concat(arr2);
    }

    return sortedArr;
};

function findInverses(arr) {
    if (arr.length <= 1) {
        return arr;
    } else {
        var midpoint = Math.floor(arr.length / 2);
        //Array.splice(index, howMany, itemToInsert1, itemToInsert2, ... , itemToInsertN)
        var fistHalfArr = arr.splice(0, midpoint);
        return mergeAndCountSorted(findInverses(fistHalfArr), findInverses(arr));
    }
}

findInverses(unsortedArr);

console.log(inverses);