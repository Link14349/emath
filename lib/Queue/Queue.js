"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        this.values = [];
    }
    Queue.prototype.push = function (x) { this.values.push(x); };
    Queue.prototype.pop = function (x) { this.values.shift(); };
    Queue.prototype.front = function () { return this.values[0]; };
    Queue.prototype.back = function () { return this.values[this.values.length - 1]; };
    Queue.prototype.empty = function () { return this.values.length < 1; };
    Queue.prototype.size = function () { return this.values.length; };
    return Queue;
}());
exports.Queue = Queue;
var CircularQueue = /** @class */ (function () {
    function CircularQueue(len) {
        this.values = [];
        this.__len = len;
        for (var i = 0; i < len; i++) {
            this.values.push(undefined);
        }
        this.head = 0;
        this.tail = 0;
    }
    CircularQueue.prototype.push = function (x) {
        this.values[this.tail] = x;
        this.tail++;
        this.tail %= this.size;
    };
    CircularQueue.prototype.pop = function () {
        this.values[this.head++] = undefined;
        this.head %= this.size;
    };
    CircularQueue.prototype.front = function () { return this.values[this.head]; };
    CircularQueue.prototype.back = function () { return this.values[this.tail - 1]; };
    CircularQueue.prototype.empty = function () { return ((this.tail >= this.head ? this.tail : this.tail + this.size) - this.head) < 1; };
    Object.defineProperty(CircularQueue.prototype, "length", {
        get: function () { return ((this.tail >= this.head ? this.tail : this.tail + this.size) - this.head); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircularQueue.prototype, "size", {
        get: function () { return this.__len; },
        enumerable: true,
        configurable: true
    });
    return CircularQueue;
}());
exports.CircularQueue = CircularQueue;
//# sourceMappingURL=Queue.js.map