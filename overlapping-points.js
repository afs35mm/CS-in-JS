/*
*
* Determine min number of overlapping points of line segments on a line
* Examples:
*   1  2  3  4  5  6
*
*   x-----x
*      x--------x
*          x-------x
*
*   ^ = [3]
*
*
*   1  2  3  4  5  6  7
*
*            x--------x
*   x-----x
*       x-------x
*               x--x
*
*   ^ = [3]
*/

var data = [
    [4, 7],
    [1, 3],
    [2, 5],
    [5, 6],
];
// var data = [
//     [1,3],
//     [2,5],
//     [3,6],
// ];

var overlapping = [];
var overlappingPoints = [];

function getSegmentPoints(lines) {
    lines.sort(function(a, b){
        return a[0] - b[0];
    });
    //console.log(lines);
    var overlappingPts = [];
    var queue = [];

    var lowestRight = lines[0][1];
    while (lines.length) {

        var line = lines.shift();
        queue.push(line);

        if (line[1] < lowestRight) {
            lowestRight = line[1];
        }
        if (line[0] > lowestRight) {
            overlappingPts.push(lowestRight);
            lowestRight = line[1];
            queue = [];
        }
    }

    // if there's left over that haven't been added
    if (queue.length) {
        for(var i = queue[0][1]; i >= queue[0][0]; i--) {
            var isOverLapping = true;
            for(var j = 0; j < queue.length; j++) {
                if ( !(i >= queue[j][0] && i <= queue[j][1]) ) {
                    isOverLapping = false;
                    break;
                }
            }

            if (isOverLapping) {
                overlappingPts.push(i);
                break;
            }
        }
    }
    if (lowestRight !== overlappingPts[overlappingPts.length -1]) {
        overlappingPts.push(lowestRight);
    }
    return overlappingPts;
}

console.log(getSegmentPoints(data).join(' '));

