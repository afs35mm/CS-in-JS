function getLongestCommonSubstring(str1, str2, str3) {
    var str1Arr = str1.split(',');
    var str2Arr = str2.split(',');
    var str3Arr = str3.split(',');
    str1Arr.unshift(0);
    str2Arr.unshift(0);
    str3Arr.unshift(0);

    var table = [];

    for(var i = 0; i < str1Arr.length; i++) {
        var outerRow = [];
        for(var j = 0; j < str2Arr.length; j++) {
            var innerRow = [];
            for(var k = 0; k < str3Arr.length; k++) {
                var itemToPush;
                if (!j || !i || !k) {
                    itemToPush = 0;
                } else {
                    itemToPush = 'x';
                    if (str1Arr[i] === str2Arr[j] && str1Arr[i] === str3Arr[k]) {
                        itemToPush = table[i - 1][j - 1][k - 1] + 1;
                    } else {
                        itemToPush = Math.max(table[i - 1][j][k], outerRow[j - 1][k], innerRow[k - 1]);
                    }
                }

                innerRow.push(itemToPush);
            }
            outerRow.push(innerRow);
        }
        table.push(outerRow);
    }
    //console.log(table);
    var lastTable = table[table.length - 1];
    var lastRow = lastTable[lastTable.length - 1];
    return lastRow[lastRow.length - 1]; // this is the NUMBER of longest common subsequences in the string
}

var str1 = '8, 3, 2, 1, 7';
var str2 = '8, 2, 1, 3, 8, 10, 7';
var str3 = '6, 8, 3, 1, 4, 7';

console.log(getLongestCommonSubstring(str1, str2, str3));
