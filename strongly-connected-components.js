var request = require('request');
request.get('https://dl.dropboxusercontent.com/u/17526827/coursera/hw-4-sample.txt', function (error, response, body) {
//request.get('http://spark-public.s3.amazonaws.com/algo1/programming_prob/SCC.txt', function (error, response, body) {
    var startTime = new Date().getTime();

    if (!error && response.statusCode == 200) {
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

        function bfs(node, localGraph, visitedNodes){
            var vertex,
                visitedNodes = visitedNodes || [];

            if (visitedNodes.indexOf(node) === -1) {
                visitedNodes.push(node);
            }
            for(var i = 0; i < localGraph.length; i ++){

                if (localGraph[i][0] === node){

                    var row = localGraph[i].slice();

                    if(visitedNodes.indexOf(row[1]) === -1) {
                        bfs(row[1], localGraph, visitedNodes);
                    }
                }
            }

            finishingTimes[node - 1] = counter++;
        }

        function flip (graph){
            var g = graph.map(function(arr) {
                var tmp = arr[0];
                arr[0] = arr[1];
                arr[1] = tmp;
                return arr.slice();
            });
            return g;
        }

        var pointsFlipped = flip(points),
            visitedNodesGlobal = [],
            finishingTimes = [],
            counter = 1;

        var flipTime = new Date().getTime();
        console.log( ((flipTime - startTime) / 1000 ) + ' seconds to flip file');

        for(var j = pointsFlipped.length -1; j >= 0; j--) {
            if( visitedNodesGlobal.indexOf(pointsFlipped[j][0]) === -1) {
                bfs(pointsFlipped[j][0], pointsFlipped, visitedNodesGlobal);
            }
        }

        var firstBfsTime = new Date().getTime();
        console.log( ((firstBfsTime - startTime) / 1000 ) + ' seconds to flip file');


        var newPoints = points.slice();

        //replace points with finishing times
        for(var p = 0; p < newPoints.length; p++) {
            for (var m = 0 ; m < newPoints[p].length; m++) {
                var newIndex = newPoints[p][m];
                newPoints[p][m] = finishingTimes[newIndex -1];
            }
        }
        newPoints = flip(newPoints);

        var flippedPointsVisited = [],
            scc = {};

        var largest = 0;
        for (var e = 0; e < pointsFlipped.length; e++) {
            if (pointsFlipped[e][0] > largest) {
                largest = pointsFlipped[e][0];
            }
        }

        var marker = 0,
            lengthArr = [];

        for(var k = largest; k >= 0; k--) {

            for(var r = 0; r < newPoints.length; r++) {
                if (newPoints[r][0] === k) {
                    if( flippedPointsVisited.indexOf(newPoints[r][0]) === -1) {
                        bfs(newPoints[r][0], newPoints, flippedPointsVisited);

                        var arrPart = flippedPointsVisited.slice(marker);
                        lengthArr.push(arrPart.length);

                        marker = flippedPointsVisited.length;
                    }
                }
            }
        }

        lengthArr.sort(function(a, b){
            return b - a;
        })

        console.log(lengthArr);
    }
});
