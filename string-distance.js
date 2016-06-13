function getStringDistance(fWord, sWord) {
    fWord = getStringArr(fWord);
    sWord = getStringArr(sWord);
    fWord.unshift(0);
    sWord.unshift(0);

    var table = [];
    for(var i = 0; i < fWord.length; i++) {
        var row = [],
            yLetter = fWord[i];
        for(var j = 0; j < sWord.length; j++) {
            var itemToPush,
                xLetter = sWord[j];
            if (!i) {
                itemToPush = j;
            } else if (!j) {
                itemToPush = i;
            } else {
                // calculate value here!
                // get min value, up one, left one, and diag up left one
                var above = table[i - 1][j];
                var diagLeft = table[i - 1][j - 1];
                var left = row[j - 1];
                var min = Math.min(left, above, diagLeft);

                // console.log(left, diagLeft, above);

                // if (!(yLetter === xLetter && i === j)) {
                //     min += 1;
                // }
                if (yLetter === xLetter ) {
                    itemToPush = diagLeft;
                } else {
                    itemToPush = min + 1;
                }
            }
            row.push(itemToPush);
        }
        table.push(row);
    }

    console.log(table);
    var lastRow = table[table.length - 1];
    return lastRow[lastRow.length - 1];
}

function getStringArr(str) {
    return str.trim().split('');
}

var fWord = 'editing',
    sWord = 'distance';

console.log(getStringDistance(fWord, sWord));
