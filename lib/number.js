var dataStruct = require("./dataStruct");
var inf = 100;
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
        return (this.numerator / this.denominator);
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
    var exps = exp.split(/={5,}/g);
    if (exps.length > 1){// many expressions
        var reses = [];
        for (var i = 0 ; i < exps.length ; i++){
            reses.push(expression(exps[i]));
        }
        return reses;
    } else {// just one expressions
        if (exp.search(/[_\\]/g) === -1 && exp.search(/[a-zA-z]\s*\([\s\S]*\)\s*=/g) === -1){// four arithmetic operation
            /*
            * {
            *   opt: "xx",
            *   priority: xx
            * }
            */
            exp = exp.replace(/\(\s*(-\d+\.{0,1}\d*\s*)\)/g,"0" + "$1");
            var optArr = [
                {opt: '+',priority: 1},
                {opt: '-',priority: 1},
                {opt: '*',priority: 2},
                {opt: '/',priority: 2},
                {opt: '%',priority: 2},
            ];
            function priority(opt){
                for(var i = 0 ; i < 4 ; i++)
                    if(opt == optArr[i].opt)
                        return optArr[i].priority;
                return -1;
            }
            function isNum(c){
                return c >= '0' && c <= '9';
            }
            function toNum(str,pos) {
                var sztmp = "";
                do {
                    sztmp += str.charAt(pos);
                    pos++;
                } while((str[pos] >='0' && str[pos]<='9') || str[pos] == '.' || str[pos] == "^");
                var sztmpArr = sztmp.split("^");
                sztmp = sztmpArr[0] * 1;
                for (var i = 1 ; i < sztmpArr.length ; i++){
                    sztmp = Math.pow(sztmp,sztmpArr[i] * 1);
                }
                return {num: sztmp * 1,index: pos};
            }

            var num = new dataStruct.stack();
            var opt = new dataStruct.stack();
            var i = 0;
            while (true){
                if (exp.charAt(i).search(/\s/g) !== -1){
                    i++;
                } else if (isNum(exp.charAt(i))){
                    var tmp = toNum(exp,i);
                    num.push(tmp.num);
                    i = tmp.index;
                } else {
                    if (exp.length <= i && opt.empty()){
                        break;
                    }
                    if (opt.empty()){
                        opt.push(exp.charAt(i));
                        i++;
                    } else {
                        if (exp.charAt(i) == "(" || priority(exp.charAt(i)) > priority(opt.top())){
                            opt.push(exp.charAt(i));
                            i++;
                        } else if (exp.charAt(i) == ")" && opt.top() == "("){
                            opt.pop();
                            i++;
                        } else {
                            var opttmp = opt.top();
                            opt.pop();
                            var numa = num.top();
                            num.pop();
                            var numb = num.top();
                            num.pop();
                            var res;
                            switch (opttmp){
                                case "+":
                                    res = numb + numa;
                                    break;
                                case "-":
                                    res = numb - numa;
                                    break;
                                case "*":
                                    res = numb * numa;
                                    break;
                                case "/":
                                    res = numb / numa;
                                    break;
                                case "%":
                                    res = numb % numa;
                                    break;
                                default:
                                    var err = new Error("Don't have this operator!");
                                    throw err;
                                    break;
                            }
                            num.push(res);
                        }
                    }
                }
            }
            return num.top();
        } else if (exp.search(/==/g) !== -1){// sigma
            /*
            * style of sigma:
            * z
            * ==
            *  /
            *  | expression
            *  \
            * ==
            * x=y
            */
            var count = lines[0];
            if (count.search(/inf/g) !== -1){
                count = inf;
            } else {
                count *= 1;
            }
            // 4 ~ -4
            var expression = "";
            for (var i = 3 ; i < (lines.length - 3) ; i++){
                expression += lines[i].replace(/^\s\|\s*([\s\S]*)/g,"$1");
                if ((i + 1) < (lines.length - 3)){
                    expression += "\n";
                }
            }
            var lastLine = lines[lines.length - 1].split(/\s*=\s*/g);
            return sigma(expression,count,{
                name: lastLine[0],
                value: lastLine[1]
            });
        } else if (exp.search(/-{3,}/g)){
            var maxLine = "";
            for (var i = 0 ; i < lines.length ; i++){
                if (lines[i].search(/^-+$/g) !== -1){
                    if (lines[i].length > maxLine.length){
                        maxLine = lines[i];
                    }
                }
            }
            var tmp = exp.split(maxLine);
            var up = tmp[0],down = tmp[1];
            return expression(up) / expression(down);
        } else {
            console.log("Now that this method is not available, you can send a brief introduction of the detailed information of this method to zhengyh2018@gmail.com by email, and we will understand the message as soon as possible and make improvements (please set the title to [emath add methods).)");
        }
    }
}
function setInf(num) {
    inf = num;
}
function sigma(exp,count,init) {
    var sum = 0;
    var newExp;
    for (var i = 0 ; i < count ; i++){
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
module.exports.setInf = setInf;
module.exports.sigma = sigma;
module.exports.MCF = MCF;
module.exports.LCM = LCM;
module.exports.commonFactor = commonFactor;
module.exports.primeFact = primeFact;
module.exports.prime = prime;
module.exports.isPrime = isPrime;