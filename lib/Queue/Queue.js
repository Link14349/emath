class Queue {
    constructor() {
        this.values = [];
    }
    push(x) { this.values.push(x); return this; }
    pop(x) { this.values.shift(); return this; }
    front() { return this.values[0]; }
    back() { return this.values[this.values.length - 1]; }
    empty() { return this.values.length < 1; }
    size() { return this.values.length; }
}
class CircularQueue {
    constructor(len) {
        this.values = [];
        this.__len = len;
        for (let i = 0; i < len; i++) {
            this.values.push(undefined);
        }
        this.head = 0;
        this.tail = 0;
    }
    push(x) {
        this.values[this.tail] = x;
        this.tail++;
        this.tail %= this.size;
    }
    pop() {
        this.values[this.head++] = undefined;
    }

    front() { return this.values[this.head]; }
    back() { return this.values[this.tail]; }
    empty() { return Math.abs(this.tail - this.head) < 1; }
    get length() { return Math.abs(this.tail - this.head); }
    get size() { return this.__len; }
}

module.exports = {
    Queue, CircularQueue
};