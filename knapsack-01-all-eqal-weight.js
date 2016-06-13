/*
*
* Finds optimal units of gold to fit in knapsack, 0/1 since you can either take it, or not, no partial units
* IMPORTANT distinction - this assumes all items have same value / weight (hence the gold)
* Future implimentation will have various values / weight, and be able to specificy which units were taken
*
*/


/*
* Returns largest amount of value for given units and a knapsack capacity
* @param {array} arry of gold bar weights
* @param {number} capacity of knapsack
*/
function getMaxGold(goldArr, capacity){
    goldArr.unshift(0);
    var table = [];

    for(var j = 0; j < goldArr.length; j++) {
        var item = goldArr[j];

        row = [];
        for(var i = 0; i <= capacity; i++) {
            var itemToPush;
            if (!i || !j){
                itemToPush = 0;
            } else {
                // if it fits
                if (i - item >= 0) {

                    // get how much capacity left if included
                    var leftOverCapacity = i - item;

                    // get highest value of left over capacity
                    if (leftOverCapacity > 0) {
                        extraVal = table[j-1][leftOverCapacity];
                    } else {
                        extraVal = 0;
                    }

                    var valIfIncluded = item + extraVal;
                    var valIfExcluded = table[j - 1][i];

                    itemToPush = valIfIncluded > valIfExcluded ? valIfIncluded : valIfExcluded;
                } else {
                    // dont include it, copy cell from above
                    itemToPush = table[j - 1][i];
                }
            }
            row.push(itemToPush);
        }
        table.push(row);
    };

    var lastRow = table[table.length - 1];
    return lastRow[lastRow.length - 1];
}

console.log(getMaxGold([5, 7, 12, 18], 20));

