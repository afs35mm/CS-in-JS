var helpers = {

    mergeSorted: function(arr1, arr2) {

        var sortedArr =[];

        while(arr1.length && arr2.length){
            if (arr1[0] <= arr2[0]) {
                sortedArr.push(arr1.shift());
            } else {
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
    },

    swap: function(arr, index1, index2) {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }

}

module.exports = helpers;