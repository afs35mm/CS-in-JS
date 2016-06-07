/*
*
* Determine number of overlapping segments each point overlaps, points given in final array
* Examples of data array below:
* 0  1  2  3  4  5  6  7  8  9  10  11  12
*
*    x--------x
*          x-----------x         x-------x
*                                x-------x
*       x     x              x   x
*/

var points = [2, 4, 9, 10];
var segments = [
    [1, 4],
    [3, 7],
    [10, 12],
    [10, 12]
];

/*
* Returns an array = in length to points,
* each with index = to the number of segments that point overlaps, phew
* @param {array} Multi dimensional sorted array of segments
* @param {array} array of points to find overlaps
*/
function getOverlapPoints(segments, points) {
    var overlaps = [],
        allPoints = [],
        mappings = {};

    // reverse them if smaller is listed first
    segments.forEach(function(segment){
        if (segment[0] > segment[1]) {
            var tmp = segment[0];
            segment[0] = segment[1];
            segment[1] = tmp;
        }

        allPoints.push({
            type: 'l',
            point: segment[0],
        },{
            type: 'r',
            point: segment[1],
        })
    });

    points.forEach(function(item, idx){
        allPoints.push({
            type: 'p',
            point: item,
        })
    });

    var sortedPoints = mergeSort(allPoints);

    var counter = 0;
    sortedPoints.forEach(function(item){
        if (item.type === 'l') {
            counter++
        } else if (item.type === 'r') {
            counter--;
        } else if (item.type === 'p') {
            // need this data structure to be key = point, value = array of occurances
            // AND because array.indexOf(X) takes too long with large data sets
            if (!mappings[item.point]) {
                mappings[item.point] = [];
            }
            mappings[item.point].push(counter)
        }
    });

    points.forEach(function(item,idx) {
        overlaps.push(mappings[item].shift());
    });

    return overlaps;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var mid = Math.floor(arr.length / 2);
    var half = arr.splice(0, mid);
    return mergeSorted(mergeSort(half), mergeSort(arr));
}

function mergeSorted(itemA, itemB) {
    var sorted = [];
    while (itemA.length && itemB.length) {
        if (itemA[0]['point'] < itemB[0]['point']) {
            var currentLowest = itemA.shift();
        } else if (itemA[0]['point'] > itemB[0]['point']) {
            var currentLowest = itemB.shift();
        } else if (itemA[0]['point'] === itemB[0]['point']) {
            if (itemA[0]['type'] < itemB[0]['type']) {
                var currentLowest = itemA.shift();
            } else {
                var currentLowest = itemB.shift();
            }
        }
        sorted.push(currentLowest);
    }

    if (itemA.length) {
        sorted = sorted.concat(itemA);
    } else if (itemB.length) {
        sorted = sorted.concat(itemB);
    }
    return sorted;
}

console.log(getOverlapPoints(segments, points));
