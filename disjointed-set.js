function DisjointSet(set) {
    this.parent = [];
    this.rank = [];
    this._largest = -Infinity;
    Object.defineProperty(this, 'largest', {
        get: function() {
            return this._largest;
        },
        set: function(newLrgVal) {
            this._largest = newLrgVal;
        },
        enumerable: true,
        configurable: true
    })
    for (var i = 0; i < set.length; i++) {
        this.parent[i] = i;
        this.rank[i] = set[i];
        if (set[i] > this.largest) {
            this.largest = set[i];
        }
    };
};

DisjointSet.prototype.merge = function(from, to) {
    if (from === to) return;
    var fromIdx = this.find(from);
    var toIdx = this.find(to);
    var tmp = this.rank[fromIdx];

    if (fromIdx !== this.parent[toIdx]){
        this.rank[toIdx] += tmp;
        this.parent[fromIdx] = toIdx;
    }
    var largest = this.rank[toIdx];
    if (largest > this.largest) {
        this.largest = largest;
    }
};

DisjointSet.prototype.find = function(i) {
    // This works, but causes stack overflow if recursion too deep,
    // then use the commented out method below if so :/
    if (this.parent[i] !== i) {
        return this.find(this.parent[i]);
    } else {
        return this.parent[i];
    }
    // var cur = i;
    // var idxToReplace = [];
    // while (cur !== this.parent[cur]) {
    //     idxToReplace.push(cur);
    //     cur = this.parent[cur];
    // }
    // idxToReplace.forEach(function(idx) {
    //     this.parent[idx] = cur;
    // }, this);
    // return cur;
};

const DjSetA = new DisjointSet([1, 1, 1, 1, 1]);
console.log(DjSetA.largest);
DjSetA.merge(4, 2);
console.log(DjSetA.largest);
DjSetA.merge(4, 2);
console.log(DjSetA.largest);
DjSetA.merge(3, 1);
console.log(DjSetA.largest);
DjSetA.merge(3, 0);
console.log(DjSetA.largest);
DjSetA.merge(3, 4);
console.log(DjSetA.largest);
DjSetA.merge(2, 4);
console.log(DjSetA.largest);

const DjSetB = new DisjointSet([10, 0, 5, 0, 3, 3]);
console.log(DjSetB.largest);
DjSetB.merge(5, 5);
console.log(DjSetB.largest);
DjSetB.merge(5, 4);
console.log(DjSetB.largest);
DjSetB.merge(3, 2);
console.log(DjSetB.largest);

