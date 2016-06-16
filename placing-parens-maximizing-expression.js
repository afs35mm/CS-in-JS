function getOpsAndValues(str) {
    var ops = [],
        rows = [],
        m = [],
        M = [];
    // get ops array and vals arr
    var strArr = str.split('');
    for(var i = 0; i < strArr.length; i++) {
        var item = strArr[i];
        if(item  === '-' || item  === '*' || item === '+') {
            var op = strArr.splice(i, 1, ' ')[0];
            ops.push(op);
        }
    };
    var numArr = strArr.join('');
    vals = numArr.split(' ').map(function(item){
        return parseInt(item, 10);
    });

    // setup initial max and min multi dimension arrays
    for(var i = 0; i < vals.length; i++) {
        var mRow = [];
        var MRow = [];
        for(var j = 0; j < vals.length; j++) {
            var itemToPush;
            if (j === i) {
                itemToPush = vals[j];
            } else {
                itemToPush = 0;
            }
            mRow.push(itemToPush);
            MRow.push(itemToPush);
        }
        m.push(mRow);
        M.push(MRow);
    }
    return {
        ops: ops,
        vals: vals,
        m: m,
        M: M,
    }
}

// actually get the damn values
function getValues(M, m, ops) {
    for(var k = 1; k < M[0].length; k++) {
        var y = 0,
            level = 1;
        for(l = k; l < M[0].length; l++) {
            // do stuff here!
            var minMax = getMaxMin(y, l, M, m, ops);
            m[y][l] = minMax.min;
            M[y][l] = minMax.max;
            y++;
        }
        level++;
    }
}

function getMaxMin(y, x, M, m, ops) {
    var curMin = Infinity;
    var curMax = -Infinity;
    for (var k = y; k <= x - 1; k++) {
        var a = getResult(M[y][k], M[k + 1][x], ops[k]);
        var b = getResult(M[y][k], m[k + 1][x], ops[k]);
        var c = getResult(m[y][k], M[k + 1][x], ops[k]);
        var d = getResult(m[y][k], m[k + 1][x], ops[k]);
        curMin = Math.min(curMin, a, b, c, d);
        curMax = Math.max(curMax, a, b, c, d);
    }
    return {
        min: curMin,
        max: curMax,
    };
}

function getResult(a, b, op) {
    a = parseInt(a, 10);
    b = parseInt(b, 10);
    if (op === '+') {
        return a + b
    } else if (op === '-') {
        return a - b;
    } else if (op === '*') {
        return a * b;
    };
};

var str = '5-8+7*4-8+9';

var opsAndVals = getOpsAndValues(str);
getValues(opsAndVals.M, opsAndVals.m, opsAndVals.ops);

var min = opsAndVals.m[0][opsAndVals.m[0].length - 1];
var max = opsAndVals.M[0][opsAndVals.m[0].length - 1];
console.log(min);
console.log(max);

var results = [];


// recursive ish! not entirely sure this doesn't have bugs ¯\_(ツ)_/¯
function getMaxRecursive(vals, ops) {
    if (vals.length === 2) {
        results.push(getResult(vals[0], vals[1], ops[0]));
    } else {
        for(var i = 0; i < vals.length - 1; i++) {
            var valsCopy = vals.slice();
            var opsCopy = ops.slice();
            var twoItems = valsCopy.splice(i, 2);
            var op = opsCopy.splice(i, 1)[0];
            var result = getResult(twoItems[0], twoItems[1], op);
            valsCopy.splice(i, 0, result);
            getMaxRecursive(valsCopy, opsCopy);
        }
    }
}

getMaxRecursive(opsAndVals.vals.slice(), opsAndVals.ops.slice());
console.log(Math.max.apply(Math, results));
console.log(Math.min.apply(Math, results));
