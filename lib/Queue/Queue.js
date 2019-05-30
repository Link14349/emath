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

module.exports = {
    Queue
};