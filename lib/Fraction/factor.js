const CircularQueue = require("./../Queue/Queue").CircularQueue;

function factors(n) {
    if (n == 1) return [1];
    if (n == 2) return [1, 2];
    let results = [1, n];
    while (n > 1) {
        let count = Math.sqrt(n);
        let flag = true;
        for (let i = 2; i <= count; i++) {
            if (n % i == 0) {
                results.push(i);
                n /= i;
                flag = false;
                break;
            }
        }
        if (flag) return results;
    }
    return results;
}

module.exports = {
    factors
};