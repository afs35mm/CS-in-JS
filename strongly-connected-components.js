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
            points[i].trim()
            points[i] = points[i].split(' ');
            for(var j = 0; j < points[i].length; j++){
                points[i][j] = parseInt(points[i][j]);
            }
        }
        // console.log(points.length);
        // console.log(points[points.length -1]);
        var parseTime = new Date().getTime();
        console.log( ((parseTime - startTime) / 1000 ) + ' seconds to parse file');

        var pointsFlipped = helpers.flipPoints(points);        
        pointsAdjList = helpers.makeAdjList(points);
        flippedPointsAdjList = helpers.makeAdjList(pointsFlipped);        

        var flipTime = new Date().getTime();
        console.log( ((flipTime - startTime) / 1000 ) + ' seconds to flip list and convert to adj list');

        /*
        * GET FINISHING TIMES
        */
        var largestNum = helpers.getLargestIndex(pointsFlipped),
            //finishingHash = {},
            finishingArr = [],
            seenVerticies = {},
            finishingTime = 1;
        finishingArr[0] = 'hold';


        //console.log(flippedPointsAdjList);

        //console.log('the largest number in points flipped is ' + largestObj.largest + ', and it is at position ' + largestObj.largestIndex);
        
        for(var j = largestNum; j > 0; j--) {
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
            //finishingHash[finishingTime] = vertex;
            finishingArr[vertex] = finishingTime;
            finishingTime++;
        };        

        console.log(finishingArr);

        var getFinishingTimes = new Date().getTime();
        console.log( ((getFinishingTimes - startTime) / 1000 ) + ' seconds to get finishing times');

        /*
        * MAKE NEW GRAPH
        */ 
        var finishingTimesGraph = [];
        for(var i = 0; i < points.length; i++) {
            var newRow = [];
            for(var j = 0; j < points[i].length; j++){
                var mappedValue = finishingArr[points[i][j]];
                newRow.push(mappedValue);
            }
            finishingTimesGraph.push(newRow);
        }

        var makeNewGraphTime = new Date().getTime();
        console.log( ((makeNewGraphTime - startTime) / 1000 ) + ' seconds to make new graph');


        finishingTimesAdjList = helpers.makeAdjList(finishingTimesGraph);        
        var largestIndex = helpers.getLargestIndex(finishingTimesGraph);
        

        /*
        * DO DFS ON NEW GRAPH POINTS OF FINISHING TIMES
        */
        var flippedSeenVerticies = {},
            marker = 0,
            leaderCount = {};            
        for (var i = largestIndex; i > 0; i --) {
            if(!flippedSeenVerticies[i]) {
                doFinalDfs(finishingTimesAdjList, i);
            }
        }

        function doFinalDfs(adjList, vertex) {
            flippedSeenVerticies[vertex] = true;
            var row = adjList[vertex];
            if(!row){
                row = [];
            }
            for(var h = 0; h < row.length; h++){
                if (!flippedSeenVerticies[row[h]]) {
                    doFinalDfs(adjList, row[h]);
                }
            }
            
            if (!leaderCount[i]) {
                leaderCount[i] = 0;
            } 
            leaderCount[i] = leaderCount[i] + 1;    
        }

        var winners = [];

        for (var key in leaderCount) {
            winners.push(leaderCount[key]);
        }

        (winners).sort(function(a,b){
            return b-a;
        });

        console.log(winners.splice(0,5));
    }
});
