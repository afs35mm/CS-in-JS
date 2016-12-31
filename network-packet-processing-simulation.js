/*
* Probably the hardest problem that seems easy on the surface I've ever seen
*
* data = [
    [bufferSize, 'X'],
    [timeof1stPacketArrival, 1StPacketProcessingTime],
    [timeof2ndPacketArrival, 2ndPacketProcessingTime],
    ...and so on...
]
*  if the buffer can hold packed i when it comes in, it goes to back of line,
*  else, it is dropped and -1 is logged
*  this logs the start time of each incomming packet, unless dropped, then -1
*/

var data = [
    [1, 'x'],
    [0, 1],
    [1, 3],
    [4, 2],
];

var data = [
    [2, 'x'],
    [0, 4],
    [4, 1],
];

var data = [
    [1, 'x'],
    [0, 1],
    [0, 1],
];

var data = [
    [1, 'x'],
    [1, 0],
];

var data = [
    [1, 'x'],
    [0, 1],
    [2, 1],
];

var data = [
    [2, 'x'],
    [0, 2],
    [1, 4],
    [5, 3],
];
// 0 2 6

function getPacketLoss(lines) {
    var finishTime = 0;
    var queue = [];
    var firstItem = true;
    var results = [];

    for(var i = 0; i < lines.length; i++) {
        var item = lines[i],
            timeToLog;

        if (!i) {
            finishTime = item[0];
        }

        while(queue.length && queue[0] <= item[0]) {
            queue.shift();
        }

        if (queue.length < bufferSize) {
            queue.push(finishTime + item[1]);
            finishTime = queue[queue.length - 1];
            timeToLog = finishTime
            console.log(finishTime);
        } else {
            console.log(-1);
            timeToLog = -1;
        }

        if (timeToLog === -1) {
            results.push(-1);
        } else {
            if (item[0] >= finishTime - item[1]) {
                results.push(item[0]);
            } else {
                results.push(finishTime - item[1]);
            }
        }
    }

    console.log(results);
}

var splicedFirst = data.splice(0, 1);
bufferSize = splicedFirst[0][0]
getPacketLoss(data);


