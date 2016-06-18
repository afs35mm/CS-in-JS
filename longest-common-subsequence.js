function getLongestCommonSubstring(str1, str2) {
    var str1Arr = str1.split(',');
    var str2Arr = str2.split(',');
    str1Arr.unshift(0);
    str2Arr.unshift(0);

    var table = [],
        points = [],
        allLcs = [];

    for(var i = 0; i < str1Arr.length; i++) {
        var row = [];
        for(var j = 0; j < str2Arr.length; j++) {
            var itemToPush;
            if (!j || !i) {
                itemToPush = 0;
            } else {
                if (str1Arr[i] === str2Arr[j]) {
                    itemToPush = table[i - 1][j - 1] + 1;

                    if (row[j - 1] === table[i - 1][j]) {
                        var letter = str1Arr[i],
                            idx = table[i - 1][j - 1];
                        points.push({
                            idx: idx,
                            item: letter,
                        });
                    }
                } else {
                    // find max of cell above, and to left
                    itemToPush = Math.max(row[j - 1], table[i - 1][j]);
                }
            }
            row.push(itemToPush);
        }
        table.push(row);
    }
    //console.log(points);
    // recursively find all of them now
    function findLcsFromGroup(arr, strSoFar) {
        var str = strSoFar || '';
        for (var i = 0; i < arr.length; i++) {
            if (arr[i - 1] && arr[i].idx <= arr[i - 1].idx) {
                var strCopy = str.substring(0, arr[i].idx);
                var arrCopy = arr.slice(i);
                findLcsFromGroup(arrCopy, strCopy);
            } else {
                str += arr[i].item;
            }
        }
        allLcs.push(str);
    }
    findLcsFromGroup(points);
    return allLcs;

    // this doesnt seem to find ALL of the, just the MAX
    // function findPathBack(y, x, previousPoints) {
    //     var previousPoints = previousPoints || [];
    //     while (x > 0 && y > 0) {
    //         // if diagonal -1 is less than above and left, go dat way
    //         if (table[y - 1][x - 1] === table[y][x - 1] && table[y - 1][x - 1] === table[y - 1][x]) {
    //             // if theyre all the same and we got to the diagonal by these two being the same, then both strings have the letter in question in common
    //             if (str2Arr[x] === str1Arr[y]) {
    //                 previousPoints.unshift(str1Arr[y]);
    //             }
    //             y--;
    //             x--;
    //         } else {
    //             if (table[y - 1][x] === table[y][x - 1]) {
    //                 findPathBack(y - 1, x, previousPoints.slice());
    //                 x--;
    //             } else if (table[y][x] === table[y - 1][x]) {
    //                 y--;
    //             } else if (table[y][x] === table[y][x - 1]) {
    //                 x--;
    //             }
    //         }
    //     }
    //     allLcs.push(previousPoints);
    // }
    // var lastY = table.length - 1;
    // var lastX = table[lastY].length - 1;
    // findPathBack(lastY, lastX);
    // return allLcs;
}


str1 = '8,3,2,1,7';
str2 = '8,2,1,3,8,10,7';
str3 = '6,8,3,1,4,7';

// str1 = '1,2,3';
// str2 = '2,1,3';
// str1 = '1,3,5';

//console.log(getLongestCommonSubstring(str1, str3));
console.log(getLongestCommonSubstring(str2, str3));
//console.log(getLongestCommonSubstring(str2, str1));
