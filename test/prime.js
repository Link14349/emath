const prime = require("./../lib/Fraction/prime");

let n = 0;
for (let i = 0; i < 100; i++) {
    n = prime.nextPrime(n);
    console.log(n);
}