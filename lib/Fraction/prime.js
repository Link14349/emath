"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPrime(n) {
    if (n <= 1)
        return false;
    if (n == 2)
        return true;
    var count = Math.sqrt(n);
    for (var i = 2; i <= count; i++) {
        if (n % i == 0)
            return false;
    }
    return true;
}
exports.isPrime = isPrime;
function primeFrom(s, e, limit) {
    if (limit === void 0) { limit = Infinity; }
    var results = [];
    var shields = {};
    if (s <= 2) {
        results.push(2);
        if (results.length >= limit)
            return results;
        s = 3;
    }
    for (var i = s; i <= e; i++) {
        if (shields[i]) {
            delete shields[i];
            continue;
        }
        var c = Math.sqrt(i);
        var flag = true;
        for (var j = 2; j <= c; j++) {
            if (i % j == 0) {
                flag = false;
            }
        }
        if (flag) {
            results.push(i);
            if (results.length >= limit)
                break;
            for (var j = 2; j <= 32 && (i * j) <= e; j++) {
                shields[i * j] = true;
            }
        }
    }
    return results;
}
exports.primeFrom = primeFrom;
function nextPrime(p) {
    var r = primeFrom(++p, Infinity, 1);
    return r[0];
}
exports.nextPrime = nextPrime;
//# sourceMappingURL=prime.js.map