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
    },

    getLargestFirstIndex: function(multiDimensionalArray) {
        var largest = 0,
            largestIndex;
        for(var i = 0; i < multiDimensionalArray.length; i++) {
            if (multiDimensionalArray[i][0] > largest) {
                largestIndex = i;
                largest = multiDimensionalArray[i][0];
            }
        }
        return {
            largestIndex: largestIndex,
            largest: largest
        }
    },

    flipPoints: function(graph){
        reversedArr = [];
        graph.map(function(arr) {
            var swappedRow = [];
            swappedRow[0] = arr[1];
            swappedRow[1] = arr[0];
            reversedArr.push(swappedRow);
        });
        return reversedArr;
    },
        
    makeAdjList: function(pointsList) {
        var adjList = {};
        for(var i = 0; i < pointsList.length; i++){
            var row = pointsList[i];
            if (!adjList[row[0]]) {
                adjList[row[0]] = [];
            } 
            adjList[row[0]].push(row[1]);
        }
        return adjList;
    },

}

module.exports = helpers;