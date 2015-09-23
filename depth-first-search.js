var adjList =[
    [1,4],
    [2,8],
    [3,6],
    [4,7],
    [5,2],
    [6,9],
    [7,1],
    [8,5,6],
    [9,7,3],
],

visitedNodes = [];

function depthFirst(node) {

    var vertex;

    visitedNodes.push(node);

    for(var i = 0; i < adjList.length; i++) {
        if (adjList[i][0] === node) {
            vertex = adjList[i].slice();

            vertex.splice(0,1);

            for(var j = 0; j < vertex.length; j++) {
                if(visitedNodes.indexOf(vertex[j]) === -1){
                    depthFirst(vertex[j]);
                }
            }


            break;
        }

    }

};

depthFirst(6);
console.log(visitedNodes);