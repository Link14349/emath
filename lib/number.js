var fs = require("fs");
class fractions
{
    constructor(info){
        var denominator = info.denominator;
        var numerator = info.numerator;
        this.denominator = denominator;
        this.numerator = numerator;
        if (this.denominator === 0){
            var err = new Error("Denominator can't is 0!");
            throw err;
        }
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
    toReduction(){
        var reductionNumber = this.reduction();
        this.denominator = reductionNumber.denominator;
        this.numerator = reductionNumber.numerator;
    }
}
function expression(exp) {
    var lines = exp.split("\n");
    if (exp.search(/\w.\w/g) !== -1)
        exp = fs.readFileSync(exp).toString();
    if (exp.search(/-+/g) === -1){// Four arithmetic expressions
        if (lines.length > 1){
            var sums = [];
            for (var i = 0 ; i < lines.length ; i++){
                sums[i] = expression(lines[i]);
            }
            return sums;
        } else {
            var numbers = lines.split(/\s*[\+\-\*\/\^]\s*/g);
            var chars = lines.split(/\D/);
            var sum = numbers[0];
            for (var i = 1 ; i < numbers.length ; i++){
                switch (chars[i - 1]){
                    case "+":
                        sum += numbers[i];
                        break;
                    case "-":
                        sum -= numbers[i];
                        break;
                    case "*":
                        sum *= numbers[i];
                        break;
                    case "/":
                        sum /= numbers[i];
                        break;
                    case "^":
                        switch (chars[i - 2]){
                            case "+":
                                sum -= numbers[i - 1];
                                sum += Math.pow(numbers[i -1],numbers[i]);
                                break;
                            case "-":
                                sum += numbers[i - 1];
                                sum -= Math.pow(numbers[i -1],numbers[i]);
                                break;
                            case "*":
                                sum /= numbers[i - 1];
                                sum *= Math.pow(numbers[i -1],numbers[i]);
                                break;
                            case "/":
                                sum *= numbers[i - 1];
                                sum /= Math.pow(numbers[i -1],numbers[i]);
                                break;
                        }
                        break;
                }
            }
            return sum;
        }
    } else if (exp.search(/\\/g) === -1){// Contain sigma expression
        /*
        * style of sigma:
        * z
        * --
        *  /
        *  | expression
        *  \
        * --
        * x=y
        */
        if (lines.length > 7){
            var firstExp = "";
            var secondExp = "";
            for (var i = 0 ; i < 7 ; i++){
                firstExp += lines[i];
                firstExp += "\n";
            }
            for (var i = 7 ; i < lines.length ; i++){
                secondExp += lines[i];
                secondExp += "\n";
            }
            return [expression(firstExp),expression(secondExp)];
        } else {
            var count = Number(lines[0]);
            var x = {
                name: lines[6].split(/\s*=\s*/g)[0],
                vlaue: Number(lines[6].split(/\s*=\s*/g)[1])
            };
            var expOfSigma = lines[3].split("|")[1].split(" ")[1];
            return sigma(expOfSigma,count,x);
        }
    } else {// Expression containing fractional operation
        var up,down;
        var max = 0,pos = 0;
        for (var i = 0 ; i < lines.length ; i++){
            if (lines.search(/^-+$/g) !== -1){
                if (lines.length > max){
                    max = lines.length;
                    pos = i;
                }
            }
        }
        for (var i = 0 ; i < pos ; i++){
            up += lines[i];
            up += "\n";
        }
        for (var i = (pos + 1) ; i < lines.length ; i++){
            down += lines[i];
            down += "\n";
        }
        return (expression(up) / expression(down));
    }
}
function sigma(exp,cout,init) {
    var sum = 0;
    var newExp;
    for (var i = 0 ; i < cout ; i++){
        newExp = exp.replace(new RegExp(init.name),init.value);
        sum += expression(newExp);
        init.value++;
    }
    return sum;
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
module.exports.expression = expression;
module.exports.sigma = sigma;
module.exports.MCF = MCF;
module.exports.LCM = LCM;
module.exports.commonFactor = commonFactor;
module.exports.primeFact = primeFact;
module.exports.prime = prime;
module.exports.isPrime = isPrime;