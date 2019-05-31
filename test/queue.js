const queue = require("./../lib/Queue/Queue");

function each(q) {
    q.forEach(function (value) {
        console.log(value);
    });
}
function test() {
    each(cq);
    console.log(cq.front(), cq.back());
    console.log("========================");
}

let cq = new queue.CircularQueue(5);
cq.push(0);
cq.push(1);
cq.push(2);
cq.push(3);
cq.pop();
cq.pop();
cq.pop();
cq.push(4);
cq.push(5);
cq.push(6);
console.log(cq);
test();