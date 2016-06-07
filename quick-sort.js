var helpers = require('./helpers');

/**
** Normal first partition partition
**/
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

var unsortedArr = [8, 10, 1, 9, 7, 2, 6, 3, 5, 4];
quickSort(unsortedArr, 0, unsortedArr.length - 1);
console.log(unsortedArr);

/**
** back position partition
**/
function partitionBack(arr, left, right){
    helpers.swap(arr, left, right);
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

function quickSortBack(arr, left, right) {
    if (left < right) {
        var partitionPoint = partitionBack(arr, left, right);
        quickSortBack(arr, left, partitionPoint - 2);
        quickSortBack(arr, partitionPoint, right);
    }
}

var unsortedArrBack = [5,2,7,8,9,2,1,11,17,9,5];
quickSortBack(unsortedArrBack, 0, unsortedArrBack.length - 1);
console.log(unsortedArrBack);

/**
** Choses 3 points between front, middle, and back, and choses to use the one
** that is BETWEEN the other 2
**/
function partitionMedian(arr, left, right){
    var left = left,
        right = right,
        middle = (right - left) % 2 != 0 ? left + Math.floor( (right - left)/2 ) : left + (right - left) / 2;
    var pivotPos;

    if(arr[left] > arr[right]) {

        if (arr[right] > arr[middle]) {
            pivotPos = right;
        } else if ( arr[left] > arr[middle]){
            pivotPos = middle
        } else {
            pivotPos = left;
        }

    }else if (arr[right] > arr[left]) {
        if ( arr[left] > arr[middle]) {
            pivotPos = left;
        } else if ( arr[right] > arr[middle]) {
            pivotPos = middle;
        } else {
            pivotPos = right;
        }
    }

    helpers.swap(arr, left, pivotPos);

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


function quickSortMedian(arr, left, right) {
    if (left < right) {
        var partitionPoint = partitionMedian(arr, left, right);
        quickSortMedian(arr, left, partitionPoint - 2);
        quickSortMedian(arr, partitionPoint, right);
    }
}

var unsortedArrMedian = [6,4,2,9,16,3,8,22,14,16];
quickSortBack(unsortedArrMedian, 0, unsortedArrMedian.length - 1);
console.log(unsortedArrMedian);

/**
** BONUS: Quick sort tail recursion
**/

function partitionTail(arr, idx1, idx2) {
    var div = idx1 + 1; // very first index as pivot
    for(var i = idx1 + 1; i <= idx2; i++) {
        if (arr[i] <= arr[idx1]) {
            helpers.swap(arr, div, i);
            div++;
        }
    }
    helpers.swap(arr, idx1, div - 1);

    return div - 1;
}

function quickSortTailRecursion(arrTail, left, right) {
    while (left < right) {
        var mid = partitionTail(arrTail, left, right);
        quickSortTailRecursion(arrTail, left, mid - 1);
        left = mid + 1;
    }
}

var unsortedArrTail = [8, 10, 1, 9, 7, 2, 6, 3, 5, 4];
quickSortTailRecursion(unsortedArrTail, 0, unsortedArrTail.length - 1);
console.log(unsortedArrTail);
