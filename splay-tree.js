/*
 * Splay Trees for everyone!
 * https://www.cs.usfca.edu/~galles/visualization/SplayTree.html
 */
function Splay() {
    this.root = null;
};

function Node(val) {
    this.val = val;
    this.sum = 0;
    this.left = null;
    this.right = null;
    this.parent = null;
};

Splay.prototype.insert = function(val) {
    var nodeToInsert = new Node(val),
        closest;
    if (!this.root) {
        this.root = nodeToInsert;
    } else {
        closest = this.search(val);
        if (closest.val === val) {
            return;
        }
        if (nodeToInsert.val < closest.val) {
            closest.left = nodeToInsert;
        } else {
            closest.right = nodeToInsert;
        }
        closest.sum += nodeToInsert.val;
        nodeToInsert.parent = closest;
        this.splayMethod(nodeToInsert);
    }
};

Splay.prototype.search = function(val) {
    if (!this.root || this.root.val === val) {
        return this.root;
    } else {
        var curNode = this.root;
        while (true) {
            if (curNode.val == val) {
                return curNode;
            }
            if (val < curNode.val) {
                if (!curNode.left) {
                    return curNode;
                } else {
                    curNode = curNode.left;
                }
            } else {
                if (!curNode.right) {
                    return curNode;
                } else {
                    curNode = curNode.right;
                }
            }
        }
    }
}

Splay.prototype.find = function(val) {
    var closestNode = this.search(val);
    if (!closestNode) return false;
    var closestVal = closestNode.val;
    this.splayMethod(closestNode);

    return closestVal == val;
};

Splay.prototype.splayMethod = function(node) {
    while (node.parent) {
        // zig case
        if (node.parent == this.root) {
            if (this.root.left == node) {
                //     p        x
                //    / \      / \
                //   x   C => A   p
                //  / \          / \
                // A   B        B   C
                var sumA = (node.left) ? node.left.sum : 0;
                var sumB = (node.right) ? node.right.sum : 0;
                var sumC = (this.root.right) ? this.root.right.sum : 0;

                var prevRoot = this.root;
                prevRoot.left = node.right;
                prevRoot.parent = node;

                if (node.right && prevRoot) {
                    prevRoot.left = node.right;
                    node.right.parent = prevRoot;
                }

                node.right = prevRoot;
                node.parent = null;

                prevRoot.sum = sumB + sumC +
                    ((prevRoot.right) ? prevRoot.right.val : 0) +
                    ((prevRoot.left) ? prevRoot.left.val : 0 );

                node.sum = sumA + ((node.left) ? node.left.val : 0) +
                prevRoot.sum + prevRoot.val;

            } else {
                //   p            x
                //  / \          / \
                // A   x   =>   p   C
                //    / \      / \
                //   B   C    A   B
                var sumA = (this.root.left) ? this.root.left.sum : 0;
                var sumB = (node.left) ? node.left.sum : 0;
                var sumC = (node.right) ? node.right.sum : 0;

                var prevRoot = this.root;
                prevRoot.right = node.left;
                prevRoot.parent = node;

                if (node.left && prevRoot) {
                    prevRoot.right = node.left;
                    node.left.parent = prevRoot;
                }

                node.left = prevRoot;
                node.parent = null;

                prevRoot.sum = sumB + sumA +
                    ((prevRoot.right) ? prevRoot.right.val : 0) +
                    ((prevRoot.left) ? prevRoot.left.val : 0 );

                node.sum = sumC + ((node.right) ? node.right.val : 0) +
                prevRoot.sum + prevRoot.val;
            }
            break;
        } else {
            var parentNode = node.parent,
                grandParentNode = parentNode.parent;
            // zig zig case
            if ((parentNode.parent.left == parentNode && node.parent.left == node) ||
                parentNode.parent.right == parentNode && node.parent.right == node) {
                if (grandParentNode.left == parentNode && parentNode.left == node) {
                    /** Swap This Way
                            g            x
                           / \          / \
                          p   D        A   p
                         / \              / \
                        x   C      =>    B   g
                       /\                    /\
                      A  B                  C  D
                    **/
                    var tmp = grandParentNode.parent,
                        a = node.left;
                        b = node.right,
                        c = parentNode.right,
                        d = grandParentNode.right;
                    var sumA = a ? a.sum : 0,
                        sumB = b ? b.sum : 0,
                        sumC = c ? c.sum : 0,
                        sumD = d ? d.sum : 0;

                    node.right = parentNode;
                    parentNode.parent = node;

                    parentNode.right = grandParentNode;
                    grandParentNode.parent = parentNode;

                    grandParentNode.right = d;
                    if (d) d.parent = grandParentNode;

                    grandParentNode.left = c;
                    if (c) c.parent = grandParentNode;

                    parentNode.left = b;
                    if (b) b.parent = parentNode;

                    node.left = a;
                    if (a) a.parent = node;

                    node.parent = tmp;

                    grandParentNode.sum = sumC + sumD +
                        ((grandParentNode.left) ? grandParentNode.left.val : 0) +
                        ((grandParentNode.right) ? grandParentNode.right.val : 0);
                    parentNode.sum = sumB + grandParentNode.sum + grandParentNode.val +
                    ((parentNode.left) ? parentNode.left.val : 0);
                    node.sum = sumA + parentNode.sum + parentNode.val +
                    ((node.left) ? node.left.val : 0);

                    if (tmp && tmp.right == grandParentNode) {
                        tmp.right = node;
                    } else if (tmp && tmp.left == grandParentNode) {
                        tmp.left = node;
                    }
                } else {
                    /** Swap This Way
                         g                  x
                        / \                / \
                       A   p              p   D
                          / \            / \
                         B   x          g   C
                             /\        /\
                            C  D      A  B
                    **/
                    var tmp = grandParentNode.parent,
                        a = grandParentNode.left;
                        b = parentNode.left,
                        c = node.left,
                        d = node.right;
                    var sumA = a ? a.sum : 0,
                        sumB = b ? b.sum : 0,
                        sumC = c ? c.sum : 0,
                        sumD = d ? d.sum : 0;

                    node.left = parentNode;
                    parentNode.parent = node;

                    parentNode.left = grandParentNode;
                    grandParentNode.parent = parentNode;

                    grandParentNode.left = a;
                    if (a) a.parent = grandParentNode;

                    grandParentNode.right = b;
                    if (b) b.parent = grandParentNode;

                    parentNode.right = c;
                    if (c) c.parent = parentNode;

                    node.right = d;
                    if (d) d.parent = node;

                    node.parent = tmp;

                    grandParentNode.sum = sumA + sumB +
                        ((grandParentNode.left) ? grandParentNode.left.val : 0) +
                        ((grandParentNode.right) ? grandParentNode.right.val : 0);
                    parentNode.sum = sumC + grandParentNode.sum + grandParentNode.val +
                    ((parentNode.right) ? parentNode.right.val : 0);
                    node.sum = sumD + parentNode.sum + parentNode.val +
                    ((node.right) ? node.right.val : 0);

                    if (tmp && tmp.left == grandParentNode) {
                        tmp.left = node;
                    } else if (tmp && tmp.right == grandParentNode) {
                        tmp.right = node;
                    }
                }
            // zig zag case
            } else {
                if (grandParentNode.right == node.parent && parentNode.left == node) {
                    //   g                 x
                    //  / \               / \
                    // D   p             G   P
                    //    / \           / \ / \
                    //   x   A    =>   D  C B  A
                    //  / \
                    // C   B
                    var tmp = grandParentNode.parent,
                        a = parentNode.right,
                        b = node.right,
                        c = node.left,
                        d = grandParentNode.left;
                    var sumA = a ? a.sum : 0,
                        sumB = b ? b.sum : 0,
                        sumC = c ? c.sum : 0,
                        sumD = d ? d.sum : 0;

                    node.left = grandParentNode;
                    grandParentNode.parent = node;
                    node.right = parentNode;
                    parentNode.parent = node;

                    parentNode.right = a;
                    if (a) a.parent = parentNode;

                    parentNode.left = b;
                    if (b) b.parent = parentNode;

                    grandParentNode.right = c;
                    if (c) c.parent = grandParentNode;

                    grandParentNode.left = d;
                    if (d) d.parent = grandParentNode;

                    grandParentNode.sum = sumD + sumC +
                        ((grandParentNode.left) ? grandParentNode.left.val : 0) +
                        ((grandParentNode.right) ? grandParentNode.right.val : 0);
                    parentNode.sum = sumB + sumA +
                        ((parentNode.left) ? parentNode.left.val : 0) +
                        ((parentNode.right) ? parentNode.right.val : 0);
                    node.sum = parentNode.sum + parentNode.val + grandParentNode.sum + grandParentNode.val;

                    node.parent = tmp;
                    if (tmp && tmp.left == grandParentNode) {
                        tmp.left = node;
                    } else if (tmp && tmp.right == grandParentNode) {
                        tmp.right = node;
                    }
                } else {
                    //     g               x
                    //    / \             / \
                    //   p   D           P   G
                    //  / \       =>    / \ / \
                    // A   x           A  B C  D
                    //    / \
                    //   B   C
                    var tmp = grandParentNode.parent,
                        a = parentNode.left,
                        b = node.left,
                        c = node.right,
                        d = grandParentNode.right;
                    var sumA = a ? a.sum : 0,
                        sumB = b ? b.sum : 0,
                        sumC = c ? c.sum : 0,
                        sumD = d ? d.sum : 0;

                    node.right = grandParentNode;
                    grandParentNode.parent = node;
                    node.left = parentNode;
                    parentNode.parent = node;

                    parentNode.left = a;
                    if (a) a.parent = parentNode;

                    parentNode.right = b;
                    if (b) b.parent = parentNode;

                    grandParentNode.left = c;
                    if (c) c.parent = grandParentNode;

                    grandParentNode.right = d;
                    if (d) d.parent = grandParentNode;

                    grandParentNode.sum = sumD + sumC +
                        ((grandParentNode.left) ? grandParentNode.left.val : 0) +
                        ((grandParentNode.right) ? grandParentNode.right.val : 0);
                    parentNode.sum = sumB + sumA +
                        ((parentNode.left) ? parentNode.left.val : 0) +
                        ((parentNode.right) ? parentNode.right.val : 0);
                    node.sum = parentNode.sum + parentNode.val + grandParentNode.sum + grandParentNode.val;

                    node.parent = tmp;
                    if (tmp && tmp.left == grandParentNode) {
                        tmp.left = node;
                    } else if (tmp && tmp.right == grandParentNode) {
                        tmp.right = node;
                    }
                }
            }
        }
    }
    this.root = node;
};

Splay.prototype.delete = function(val) {
    var hasFound = this.find(val);
    if (hasFound) {
        var leftTree = this.root.left;
        var rightTree = this.root.right;
        delete this.root;
        if (leftTree) {
            this.root = leftTree;
            leftTree.parent = null;
            this.splayMethod(this.findLargest(this.root));
            this.root.right = rightTree;
            if (rightTree) {
                rightTree.parent = this.root;
            }
        } else {
            this.root = rightTree;
            if (rightTree) {
                rightTree.parent = null;
            }
        }
        if (!this.root) return;
        this.root.sum = ((this.root.right) ? this.root.right.sum + this.root.right.val : 0) +
            ((this.root.left) ? this.root.left.sum + this.root.left.val : 0);
    }
};

Splay.prototype.findLargest = function(node) {
    var curNode = node;
    while (curNode.right) {
        curNode = curNode.right;
    };
    return curNode;
};

Splay.prototype.inOrderTraversal = function(curNode) {
    if ((!curNode instanceof Node)) {
        throw new Error('needs to be of type Node');
    }
    var stack = [],
        inOrderArray = [],
        curNode = curNode || this.root;
    while(curNode || stack.length) {
        if (curNode) {
            stack.unshift(curNode);
            curNode = curNode.left;
        }

        if (!curNode) {
            var frontItem = stack.shift();
            inOrderArray.push(frontItem.val);
            curNode = frontItem.right;
        }
    }
    return inOrderArray;
};

Splay.prototype.sumNaieve = function(min, max) {
    var stack = [],
        curNode = this.root,
        sum = 0;
    while(curNode || stack.length) {
        if (curNode) {
            stack.unshift(curNode);
            curNode = curNode.left;
        }

        if (!curNode) {
            var frontItem = stack.shift();
            // inOrderArray.push(frontItem.val);
            if (frontItem.val >= min && frontItem.val <= max) {
                sum += frontItem.val;
            }
            curNode = frontItem.right;
        }
    }
    return sum;
};

Splay.prototype.searchMax = function(val) {
    if (!this.root || this.root.val === val) {
        return this.root;
    } else {
        var curNode = this.root;
        while (curNode) {
            if (curNode.val == val) {
                return curNode;
            }
            if (curNode.val <= val) {
                if (!curNode.right) {
                    return curNode;
                } else {
                    curNode = curNode.right;
                }
            } else {
                if (curNode.left) {
                    curNode = curNode.left;
                } else {
                    return curNode;
                }
            }
        }
        return curNode;
    }
}

Splay.prototype.searchMin = function(val) {
    if (!this.root || this.root.val === val) {
        return this.root;
    } else {
        var curNode = this.root;
        while (curNode) {
            if (curNode.val == val) {
                return curNode;
            }
            if (curNode.val >= val) {
                if (!curNode.left) {
                    return curNode;
                } else {
                    curNode = curNode.left;
                }
            } else {
                if (curNode.right) {
                    curNode = curNode.right;
                } else {
                    return curNode;
                }
            }
        }
        return curNode;
    }
}

Splay.prototype.sum = function(min, max) {
    if (this.root === null) return 0;

    var total = this.root.sum + this.root.val;
    var maxNode = this.searchMax(max);
    this.splayMethod(maxNode);

    var largerThanRange = ((this.root.right) ? (this.root.right.val + this.root.right.sum) : 0);
    largerThanRange += ((this.root.val > max) ? this.root.val : 0)

    var minNode = this.searchMin(min);
    this.splayMethod(minNode);
    var smallerThanRange;
    var smallerThanRange = ((this.root.left) ? (this.root.left.val + this.root.left.sum) : 0);
    smallerThanRange += ((this.root.val < min) ? this.root.val : 0);
    return total - (largerThanRange + smallerThanRange);
};


var splay = new Splay();
splay.insert(1);
splay.insert(2);
splay.insert(3);
splay.insert(4);
splay.insert(5);
console.log(splay.find(3)); // true
console.log(splay.find(27)); // false
console.log(splay.sum(1, 5)); // 15
splay.delete(4);
console.log(splay.sum(1, 5)); // 11
