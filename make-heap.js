var data = [20, 13, 9, 8, 5, 3, 7, 6, 2, 1];
var data = [13, 12, 11, 10, 9];
var data = [1, 2, 3, 4, 5];
var data = [5, 4, 3, 2, 1];

function heapify(heap) {
    for (var i = Math.floor(heap.length / 2); i >= 0; i--) {
        siftDown(i, heap);
    }
    console.log(heap)
}

function siftDown(k, arr) {
    while ((2 * k) <= arr.length) {

        left = 2 * k + 1;
        right = 2 * k + 2;
        //console.log('comparing root', arr[k], 'left', arr[left], 'right', arr[right]);
        if (arr[k] > arr[left] && arr[k] > arr[right]) {
            if (arr[left] <= arr[right]) {
                swap(arr, k, left);
                k = left;
            } else {
                swap(arr, k, right);
                k = right;
            }
        } else if (arr[k] > arr[left]) {
            swap(arr, k, left);
            k = left;
        } else if(arr[k] > arr[right]) {
            swap(arr, k, right);
            k = right;
        }else{
            break;
        }
    }
}

function swap(arr, idx1, idx2) {
    var tmp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = tmp;
    console.log('swapping index ${idx1} with ${idx2}');
}

heapify(data);
