var helpers = require('./helpers');

var unsortedArr = [8, 10, 1, 9, 7, 2, 6, 3, 5, 4];

function partition(arr, left, right){
    var pivot = arr[left],
        k = left + 1;
    for (var i = left+1; i <= right; i++){
        if(arr[i] < pivot){
            helpers.swap(arr, i, k);
            k++;
        }
    }
    helpers.swap(arr, k - 1, left);
    return k;
}

function quickSort(arr, left, right) {
    //needs to be left/right because you're always operating on same array, NOT smaller splices of it
    if (left < right) {
        var pivot = partition(arr, left, right);
        quickSort(arr, left, pivot - 2);
        quickSort(arr, pivot, right);
    }
}
quickSort(unsortedArr, 0, unsortedArr.length - 1);
console.log(unsortedArr);