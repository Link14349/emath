import {isPrime, nextPrime, primeFrom} from "./prime"

export function factors(n : number) : Array<number> {
    if (n == 1) return [1];
    let results = [1, n];
    let c = parseInt(String(Math.sqrt(n)));
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
export function primeFactors(n : number) : Array<number> {
    let primes = primeFrom(2, n);
    console.log(primes);
    let results = [];
    let shields = {};
    for (let i = 0; i < primes.length; i++) {
        if (n % primes[i] == 0) {
            results.push(primes[i]);
            let t = n / primes[i];
            if (isPrime(t) && !shields[t]) {
                results.push(t);
                shields[t] = true;
            }
        }
    }
    return results;
}
export function canDiv(n : number, s : number) : boolean {
    return !(n % s);
}
export function MCF(n : number, m : number) : number {
    let res = 1;
    let p = 2;
    do {
        while (canDiv(n, p) && canDiv(m, p)) {
            n /= p;
            m /= p;
            res *= p;
        }
        p = nextPrime(p);
    } while (p <= n && p <= m);
    return res;
}
export function MCM(n : number, m : number) : number {
    n /= MCF(n, m);
    return n * m;
}
export function MutualPrime(n : number, m : number) : boolean {
    return MCF(n, m) == 1;
}