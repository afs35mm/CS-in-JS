var heap = require('./heap');
var request = require('request');

var nodesInTerritory = {},
    greedyScores = {},
    paths = {};

request.get('http://spark-public.s3.amazonaws.com/algo1/programming_prob/dijkstraData.txt', function (error, response, body) {
//request.get('https://dl.dropboxusercontent.com/u/17526827/coursera/hw-5.txt', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        lengthHash = makeLengthHash(body);
        dikstras(['1'], '7', lengthHash);
        dikstras(['1'], '37', lengthHash);
        dikstras(['1'], '59', lengthHash);
        dikstras(['1'], '82', lengthHash);
        dikstras(['1'], '99', lengthHash);
        dikstras(['1'], '133', lengthHash);
        dikstras(['1'], '165', lengthHash);
        dikstras(['1'], '188', lengthHash);
        dikstras(['1'], '197', lengthHash);
    }
});


var dikstras = function(seenNodes, finishNode, hash, greedyScore) {
    seenNodes = [].concat(seenNodes);
    var greedyScore = greedyScore || {},
        lowestGreedyScore = Infinity,
        edgeToSuckIn,
        minEdgeLen;


    for(var i = 0; i < seenNodes.length; i++) {
        var vertex = seenNodes[i],
            gc;

        if (!greedyScores[vertex]) {
            greedyScores[vertex] = 0;
        }

        var edges = hash[seenNodes[i]];
        for (var point in edges){
            if (seenNodes.indexOf(point) < 0){
                if (greedyScores[vertex] + edges[point] < lowestGreedyScore) {
                    lowestGreedyScore  = greedyScores[vertex] + edges[point];
                    greedyScoreToAdd = greedyScores[vertex];
                    edgeToSuckIn = point;
                    minEdgeLen = edges[point];
                }
            }
        }
    }    

    if (edgeToSuckIn) {
        greedyScores[edgeToSuckIn] = parseInt(greedyScoreToAdd) + parseInt(minEdgeLen);
        seenNodes.push(edgeToSuckIn);
        if (finishNode === edgeToSuckIn) {
            console.log('Shortest distance from ', seenNodes[0], ' to ', finishNode, ' is ', greedyScores[edgeToSuckIn]);
        } else {
            dikstras(seenNodes, finishNode, hash, greedyScore);    
        }
    }
}

var makeLengthHash = function(bodyString) {
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
