var adjLists = require('./adjacency-list');

var results = {};

for(var f = 0; f < 100; f++) {

    var arrCp = adjLists['lists']['listOne'].map(function(arr) {
        return arr.slice();
    });
    var minCuts = getMinCut(arrCp)[0].length - 1;

    if(!results[minCuts]) {
        results[minCuts] = 1;
    } else {
        results[minCuts]++;
    }
}

console.log(results);

function getMinCut(adjMatrix) {
    while (adjMatrix.length > 2) {
        //pick a random row in the adj list
        var randomRow = Math.floor(Math.random() * (adjMatrix.length - 1) + 1);
        //pick a random index in that one
        var randomIndex = Math.floor(Math.random() * (adjMatrix[randomRow].length - 1) + 1);
        //get the item of the random index (row that we will be appending to)
        var vertexToAppendTo = adjMatrix[randomRow][randomIndex];
        //append that stuff, need to loop through the whole thing
        var rowToAppendTo = null;
        for (var j = 0; j < adjMatrix.length; j++) {
            if (adjMatrix[j][0] === vertexToAppendTo) {
                rowToAppendTo = j;
            }
        }

        adjMatrix[rowToAppendTo].push.apply(adjMatrix[rowToAppendTo], adjMatrix[randomRow].slice(1));

        //replace all references from the node we merged, with the one we merged into
        for(var k = 0; k < adjMatrix.length; k ++) {
            for (var l = 1; l < adjMatrix[k].length; l++) {
                if(adjMatrix[k][l] === adjMatrix[randomRow][0]) {
                    adjMatrix[k][l] = vertexToAppendTo;
                }
            }
        }

        //remove self loops
        for (var m = 1; m < adjMatrix[rowToAppendTo].length; m++){
            if (adjMatrix[rowToAppendTo][m] === adjMatrix[rowToAppendTo][0]) {
                adjMatrix[rowToAppendTo].splice(m, 1);
                m--;
            }
        }
        //remove dat row
        adjMatrix.splice(randomRow, 1);

    }

    return adjMatrix;
}
