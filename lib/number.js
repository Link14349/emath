class fractions
{
    constructor(info){
        var denominator = info.denominator;
        var numerator = info.numerator;
        this.denominator = denominator;
        this.numerator = numerator;
    }
    value(){
        return (this.numerator / this.numerator);
    }
    reduction(){
        var newFractions = new fractions({
            denominator: (this.denominator / maximum(this.denominator,this.numerator)),
            numerator: (this.numerator / maximum(this.denominator,this.numerator))
        });
        return newFractions;
    }
}
function MCF(a,b) {
    var primeOfA = primeFact(a);
    var primeOfB = primeFact(b);
    var commonFactors = commonFactor(primeOfA,primeOfB);
    var max = commonFactors[0];
    for (var i = 1 ; i < commonFactors.length ; i++){
        if (max < commonFactors[i]){
            max = commonFactors[i];
        }
    }
    return max;
}
function LCM(a,b) {
    var MCFA = MCF(a,b);
    a /= MCFA;
    b /= MCFA;
    return (a * b * MCFA);
}
function commonFactor(a,b) {
    var commonFactors = [];
    for (var i in a){
        for (var j in b){
            if (a[i] == b[j]){
                commonFactors.push(a[i]);
                break;
            }
        }
    }
    return commonFactors;
}
function primeFact(n) {
   var primeNumbers = [];
   var arr = prime(Math.sqrt(n));
   for (var i in arr){
       if (n % i == 0){
           primeNumbers.push(arr[i]);
           n /= i;
       }
   }
   if (n != 1){
       primeNumbers.push(n);
   }
   return primeNumbers;
}
function prime(max) {
    var primes = [];
    for (var i = 2 ; i < max ; i++){
        if (isPrime(i)){
            primes.push(i);
        }
    }
    return primes;
}
function isPrime(n) {
    var yes = true;
    for (var i = 2 ; i < Math.sqrt(n) ; i++){
        if (n % i == 0){
            yes = false;
            break;
        }
    }
    return yes;
}
module.exports.fractions = fractions;
module.exports.MCF = MCF;
module.exports.LCM = LCM;
module.exports.commonFactor = commonFactor;
module.exports.primeFact = primeFact;
module.exports.prime = prime;
module.exports.isPrime = isPrime;