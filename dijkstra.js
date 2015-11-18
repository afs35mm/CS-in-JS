var fs = require('fs');
// var request = require('request');

// Original HTTP get was from:
// request.get('http://spark-public.s3.amazonaws.com/algo1/programming_prob/dijkstraData.txt', function (error, response, body) {});
fs.readFile('./data/dijkstra-data.txt', function(err, data){
    if (!err) {
        var lengthHash = makeLengthHash(data.toString());
        dikstras('7', lengthHash);
        dikstras('37', lengthHash);
        dikstras('59', lengthHash);
        dikstras('82', lengthHash);
        dikstras('99', lengthHash);
        dikstras('115', lengthHash);
        dikstras('133', lengthHash);
        dikstras('165', lengthHash);
        dikstras('188', lengthHash);
        dikstras('197', lengthHash);
    }
});

function dikstras(finishNode, hash, greedyScore, seenNodes) {
    var greedyScore = greedyScore || {},
        seenNodes = seenNodes || [],
        lowestGreedyScore = Infinity,
        edgeToSuckIn,
        minEdgeLen;

    if(!seenNodes.length) {
        // the default is were finding the shortest path from 1, kinda sucks they're all strings, but ¯\_(ツ)_/¯
        seenNodes.push('1');
    }

    for(var i = 0; i < seenNodes.length; i++) {
        var vertex = seenNodes[i],
            gc;

        if (!greedyScore[vertex]) {
            greedyScore[vertex] = 0;
        }

        var edges = hash[seenNodes[i]];
        for (var point in edges){
            if (seenNodes.indexOf(point) < 0){
                if (greedyScore[vertex] + edges[point] < lowestGreedyScore) {
                    lowestGreedyScore  = greedyScore[vertex] + edges[point];
                    greedyScoreToAdd = greedyScore[vertex];
                    edgeToSuckIn = point;
                    minEdgeLen = edges[point];
                }
            }
        }
    }

    if (edgeToSuckIn) {
        greedyScore[edgeToSuckIn] = parseInt(greedyScoreToAdd) + parseInt(minEdgeLen);
        seenNodes.push(edgeToSuckIn);
        if (finishNode === edgeToSuckIn) {
            console.log('Shortest distance from ', seenNodes[0], ' to ', finishNode, ' is ', greedyScore[edgeToSuckIn]);
        } else {
            dikstras(finishNode, hash, greedyScore, seenNodes);
        }
    }
}

function makeLengthHash(bodyString) {
    var body = bodyString;
    var points = body.split('\n');
    var pointsList = {};
    for (var i = 0; i < points.length; i++ ){
        // to make sure its not the new line at EOF
        if (points[i].length > 1){
            var row = points[i].trim().split(/\s+/);
            for(var j = 0; j < row.length; j++){
                if (row[j].indexOf(',') < 0) {
                    var point = row[j];
                    pointsList[point] = {};
                } else {
                    var pointAndLength = row[j].split(',');
                    var pointTo = pointAndLength[0];
                    var len = pointAndLength[1];
                    pointsList[point][pointTo] = parseInt(len);
                }
            }
        }
    }
    return pointsList;
};
