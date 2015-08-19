var unsortedArr = [ 6, 1, 9, 25, 982, 34, 87, 20, 38, 99, 24, 74, 20 , 31];

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