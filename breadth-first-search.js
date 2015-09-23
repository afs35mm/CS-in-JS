var list =[
    [1,2,6],
    [2,1,3],
    [3,2,4,5,6],
    [4,3,5],
    [5,4,3,6],
    [6,1,3,5],

];

function breadthFirst(adjList, startingNode) {

    var visitedNodes = [],
        queue = [],
        levelList =[];

    queue.push(startingNode);
    visitedNodes.push(startingNode);

    while(queue.length) {

        var vertex = queue.shift();

        for(var i = 0; i < adjList.length; i++){
            if(adjList[i][0] === vertex) {
                var row = adjList[i];

                var verticies =[];

                for (var j = 1; j < row.length; j++) {
                    if (visitedNodes.indexOf(row[j]) === -1) {
                        queue.push(row[j]);
                        visitedNodes.push(row[j]);
                        verticies.push(row[j]);
                    }
                }

                break;
            }
        }
    }

     return visitedNodes;

};

console.log(breadthFirst(list, 1));
