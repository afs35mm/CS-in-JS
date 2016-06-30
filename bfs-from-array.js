/*
*     0
*    / \
*   1   3
*       |
*       4
*       |
*       2
*
*   ^ above example is 3 levels
*/

//var data = '4 -1 4 1 1';
var data = '-1 0 4 0 3';

function getTreeDepth(str) {
    var nodeArr = str.trim().split(' ');
    nodeArr.map(function(item, i){
        //var num = parseInt(item, 10);
        if (!tree[item]) {
            tree[item] = [];
        }
        tree[item].push(i);
    });

    var topNode = tree['-1'];
    var firstChildren = tree[topNode];
    var counter = 1;
    var queue = [];

    queue = firstChildren;

    var marker = queue.length;

    for(var i = 0; i < queue.length; i++) {
        if (i === marker) {
            counter++;
            marker = queue.length;
        }

        if (tree[queue[i]]) {
            queue.push.apply(queue, tree[queue[i]]);
        }
        //console.log(i, queue[i], tree[queue[i]]);
    }
    //console.log(queue);

    return counter + 1;
}

console.log(getTreeDepth(data)); // logs how many levels
