var heap = require('./heap');
var request = require('request');

request.get('https://dl.dropboxusercontent.com/u/17526827/coursera/hw-5.txt', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var body = body;
        var points = body.split('\n');
        var pointsList = {};
        for (var i = 0; i < points.length; i++ ){
            // to make sure its not the new line at EOF
            if (points[i].length > 1){
                var row = points[i].trim().split(' ');
                for(var j = 0; j < row.length; j++){
                    if (row[j].indexOf(',') < 0) {
                        var point = row[j];
                        pointsList[point] = {};
                    } else {
                        var pointAndLength = row[j].split(',');
                        var pointTo = pointAndLength[0];
                        var len = pointAndLength[1]; 
                        pointsList[point][pointTo] = len;
                    }
                }
            }
        }
        console.log(pointsList);
    }
});
