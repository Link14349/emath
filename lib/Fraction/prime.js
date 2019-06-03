function isPrime(n) {
    if (n <= 1) return false;
    if (n == 2) return true;
    let count = Math.sqrt(n);
    for (let i = 2; i <= count; i++) {
        if (n % i == 0) return false;
    }
    return true;
}
function primeFrom(s, e) {
    if (s <= 2) s = 3;
    let results = [2];
    let shields = {};
    for (let i = s; i <= e; i++) {
        if (shields[i]) {
            delete shields[i];
            continue;
        }
        let c = Math.sqrt(i);
        let flag = true;
        for (let j = 2; j <= c; j++) {
            if (i % j == 0) {
                flag = false;
            }
        }
        if (flag) {
            results.push(i);
            for (let j = 2; j <= 32 && (i * j) <= e; j++) {
                shields[i * j] = true;
            }
        }
    }
    return results;
}

module.exports = {
    isPrime, primeFrom
};
