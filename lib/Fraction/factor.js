const prime = require("./prime");

function factors(n) {
    if (n == 1) return [1];
    let results = [1, n];
    let c = parseInt(Math.sqrt(n));
    let shields = {};
    for (let i = 2; i <= c; i++) {
        if (shields[i]) {
            delete shields[i];
            continue;
        }
        if (n % i == 0) {
            results.push(i);
            if (i < c) results.push(n / i);
            for (let j = 2; j <= 32 && (i * j) <= n; j++) {
                shields[i * j] = true;
            }
        }
    }
    return results;
}
function primeFactors(n) {
    let primes = prime.primeFrom(2, n);
    console.log(primes);
    let results = [];
    let shields = {};
    for (let i = 0; i < primes.length; i++) {
        if (n % primes[i] == 0) {
            results.push(primes[i]);
            let t = n / primes[i];
            if (prime.isPrime(t) && !shields[t]) {
                results.push(t);
                shields[t] = true;
            }
        }
    }
    return results;
}

module.exports = {
    factors, primeFactors
};