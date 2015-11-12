var helpers = require('./helpers');
var request = require('request');
//request.get('https://dl.dropboxusercontent.com/u/17526827/coursera/hw-4-sample.txt', function (error, response, body) {
request.get('http://spark-public.s3.amazonaws.com/algo1/programming_prob/SCC.txt', function (error, response, body) {
    var startTime = new Date().getTime();

    if (!error && response.statusCode == 200) {
        
        /*
        * PARSE FILE
        */
        var body = body;
        var points = body.split('\n');

        for (var i = 0; i < points.length; i++ ){
            points[i] = points[i].split(' ');
            points[i].splice(-1);
            for(var j = 0; j < points[i].length; j++){
                points[i][j] = parseInt(points[i][j]);
            }
        }
        var parseTime = new Date().getTime();
        console.log( ((parseTime - startTime) / 1000 ) + ' seconds to parse file');

        var pointsFlipped = helpers.flipPoints(points);        
        //pointsAdjList = helpers.makeAdjList(points);
        flippedPointsAdjList = helpers.makeAdjList(pointsFlipped);        

        /*
        * GET FINISHING TIMES
        */
        var largestObj = helpers.getLargestFirstIndex(pointsFlipped),
            finishingHash = {},
            seenVerticies = {},
            finishingTime = 1;
        //console.log('the largest number in points flipped is ' + largestObj.largest + ', and it is at position ' + largestObj.largestIndex);
        for(var j = largestObj.largest; j > 0; j--) {
            if (!seenVerticies[j]) {
                dfsForFinishingTimes(flippedPointsAdjList, j);
            }
        }

        function dfsForFinishingTimes(adjList, vertex) {
            seenVerticies[vertex] = true;
            var row = adjList[vertex];
            if(!row){
                row = [];
            }
            for(var i = 0; i < row.length; i++){
                if (!seenVerticies[row[i]]) {
                    dfsForFinishingTimes(adjList, row[i]);
                }
            }
            finishingHash[finishingTime] = vertex;
            finishingTime++;
        };
        console.log(finishingHash);


                // function bfs(node, localGraph, visitedNodes){
        //     var vertex,
        //         visitedNodes = visitedNodes || {};
        //     if ( !visitedNodes[node] ) {
        //         visitedNodes[node] = true;
        //     }
        //     for(var i = 0; i < localGraph.length; i ++){

        //         if (localGraph[i][0] === node){

        //             var row = localGraph[i].slice(0);

        //             if( !visitedNodes[row[1]] ) {
        //                 bfs(row[1], localGraph, visitedNodes);
        //             }
        //         }
        //     }
        //     finishingTimes[node - 1] = counter++;
        // }


        // var pointsFlipped = flip(points),
        //     visitedNodesGlobal = {},
        //     finishingTimes = [],
        //     counter = 1;

        // var flipTime = new Date().getTime();
        // console.log( ((flipTime - startTime) / 1000 ) + ' seconds to flip file');

        // for(var j = pointsFlipped.length -1; j >= 0; j--) {
        //     if( !visitedNodesGlobal[pointsFlipped[j][0]] ) {
        //         bfs(pointsFlipped[j][0], pointsFlipped, visitedNodesGlobal);
        //     }
        // }

        // var firstBfsTime = new Date().getTime();
        // console.log( ((firstBfsTime - startTime) / 1000 ) + ' seconds to first bfs search');


        // var newPoints = points.slice(0);

        // //replace points with finishing times
        // for(var p = 0; p < newPoints.length; p++) {
        //     for (var m = 0 ; m < newPoints[p].length; m++) {
        //         var newIndex = newPoints[p][m];
        //         newPoints[p][m] = finishingTimes[newIndex -1];
        //     }
        // }
        // newPoints = flip(newPoints);


        // var replacePointsFinisingTimes = new Date().getTime();
        // console.log( ((replacePointsFinisingTimes - startTime) / 1000 ) + ' seconds to replace points with finishing times');


        // var flippedPointsVisited = {},
        //     scc = {};

        // var largest = 0;
        // for (var e = 0; e < pointsFlipped.length; e++) {
        //     if (pointsFlipped[e][0] > largest) {
        //         largest = pointsFlipped[e][0];
        //     }
        // }

        // var marker = 0,
        //     lengthArr = [];

        // for(var k = largest; k >= 0; k--) {

        //     for(var r = 0; r < newPoints.length; r++) {
        //         if (newPoints[r][0] === k) {
        //             if( !flippedPointsVisited[newPoints[r][0]] ) {
        //                 bfs(newPoints[r][0], newPoints, flippedPointsVisited);

        //                 lengthArr.push(Object.keys(flippedPointsVisited).length - marker);
        //                 marker = Object.keys(flippedPointsVisited).length;

        //             }
        //         }
        //     }
        // }

        // var lastBfs = new Date().getTime();
        // console.log( ((lastBfs - startTime) / 1000 ) + ' seconds for last bfs');

        // // lengthArr.sort(function(a, b){
        // //     return b - a;
        // // })
        // //ulimit -s 65500; node --stack_size=65500 scc.js

        // console.log(lengthArr);
    }
});
