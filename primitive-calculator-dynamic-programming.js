function getSmallestNumOperationsExpensive(num) {
    var counts = [];
    var distance = [];
    distance.push(0, 0);
    counts.push({
        count: 0,
        paths: []
    },{
        count: 0,
        paths: [1]
    });
    for(var i = 2; i <= num; i++) {
        // way more in depth but too expensive to keep list of lists :(
        var lowest = counts[i - 1].count;
        var lowestIdx = i - 1;

        if (counts[i / 2] !== undefined && counts[i / 2].count < lowest) {
            var lowest = counts[i / 2].count;
            var lowestIdx = i / 2;
        }
        if (counts[i / 3] !== undefined && counts[i / 3].count < lowest) {
            var lowest = counts[i / 3].count;
            var lowestIdx = i / 3;
        }

        var arrCopy = counts[lowestIdx].paths.slice(0);
        arrCopy.push(i)
        counts.push({
            count: counts[lowestIdx].count + 1,
            paths: arrCopy,
        });
        distance.push(lowest + 1);
    }
    return counts.splice(-1)[0];
}

function getSmallestNumOperations(num) {
    var prev = [];
    var distance = [];

    prev.push(undefined, 0);
    distance.push(undefined, 0);

    for(var i = 2; i <= num; i++) {
        var prevLowest = prev[i - 1];
        var prevLowestIdx = i - 1;

        if (prev[i / 2] !== undefined && prev[i / 2] < prevLowest) {
            var prevLowest = prev[i / 2];
            var prevLowestIdx = i / 2;
        }

        if (prev[i / 3] !== undefined && prev[i / 3] < prevLowest) {
            var prevLowest = prev[i / 3];
            var prevLowestIdx = i / 3;
        }

        distance.push(prevLowestIdx);
        prev.push(prevLowest + 1);
    }

    var calculations = [];

    // console.log(distance);
    // console.log(prev);

    var cur = num;
    while (cur >= 1) {
        calculations.unshift(cur);
        cur = distance[cur];
    }

    return calculations;
};

var data = 96234;

var countsObjArr = getSmallestNumOperationsExpensive(data);
console.log(countsObjArr.count);
console.log(countsObjArr.paths.join(' '));

var pathArr = getSmallestNumOperations(data);
console.log(pathArr.length - 1);
console.log(pathArr.join(' '));
