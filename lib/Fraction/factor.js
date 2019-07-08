"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prime_1 = require("./prime");
function factors(n) {
    if (n == 1)
        return [1];
    var results = [1, n];
    var c = parseInt(String(Math.sqrt(n)));
    var shields = {};
    for (var i = 2; i <= c; i++) {
        if (shields[i]) {
            delete shields[i];
            continue;
        }
        if (n % i == 0) {
            results.push(i);
            if (i < c)
                results.push(n / i);
            for (var j = 2; j <= 32 && (i * j) <= n; j++) {
                shields[i * j] = true;
            }
        }
    }
    return results;
}
exports.factors = factors;
function primeFactors(n) {
    var primes = prime_1.primeFrom(2, n);
    console.log(primes);
    var results = [];
    var shields = {};
    for (var i = 0; i < primes.length; i++) {
        if (n % primes[i] == 0) {
            results.push(primes[i]);
            var t = n / primes[i];
            if (prime_1.isPrime(t) && !shields[t]) {
                results.push(t);
                shields[t] = true;
            }
        }
    }
    return results;
}
exports.primeFactors = primeFactors;
function canDiv(n, s) {
    return !(n % s);
}
exports.canDiv = canDiv;
function MCF(n, m) {
    var res = 1;
    var p = 2;
    do {
        while (canDiv(n, p) && canDiv(m, p)) {
            n /= p;
            m /= p;
            res *= p;
        }
        p = prime_1.nextPrime(p);
    } while (p <= n && p <= m);
    return res;
}
exports.MCF = MCF;
function MCM(n, m) {
    n /= MCF(n, m);
    return n * m;
}
exports.MCM = MCM;
function MutualPrime(n, m) {
    return MCF(n, m) == 1;
}
exports.MutualPrime = MutualPrime;
//# sourceMappingURL=factor.js.map