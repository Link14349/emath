export class Queue {
    constructor() {
        this.values = [];
    }
    private values : Array<any>;
    push(x : any) : void { this.values.push(x); }
    pop(x : any) : void { this.values.shift(); }
    front() : any { return this.values[0]; }
    back() : any { return this.values[this.values.length - 1]; }
    empty() : boolean { return this.values.length < 1; }
    size() : number { return this.values.length; }
}
export class CircularQueue {
    private values : Array<any>;
    private __len : number;
    private head : number;
    private tail : number;
    constructor(len : number) {
        this.values = [];
        this.__len = len;
        for (let i = 0; i < len; i++) {
            this.values.push(undefined);
        }
        this.head = 0;
        this.tail = 0;
    }
    push(x : any) : void {
        this.values[this.tail] = x;
        this.tail++;
        this.tail %= this.size;
    }
    pop() : void {
        this.values[this.head++] = undefined;
        this.head %= this.size;
    }
    front() : any { return this.values[this.head]; }
    back() : any { return this.values[this.tail - 1]; }
    empty() : boolean { return ((this.tail >= this.head ? this.tail : this.tail + this.size) - this.head) < 1; }
    get length() : number { return ((this.tail >= this.head ? this.tail : this.tail + this.size) - this.head); }
    get size() : number { return this.__len; }
}