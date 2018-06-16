function max(numbers) {
    var maxNum,number;
    if (typeof numbers[0] === "number"){
        maxNum = numbers[0];
        number = numbers[0];
    } else {
        maxNum = numbers[0].value();
        number = numbers[0];
    }
    for (var i in numbers) {
        if (typeof numbers[i] === "number") {
            if (numbers[i] > maxNum) {
                maxNum = numbers[i];
                number = numbers[i];
            }
        } else {
            if (numbers[i] > maxNum) {
                maxNum = numbers[i].value();
                number = numbers[i];
            }
        }
    }
    return number;
}
function min(numbers) {
    var minNum,number;
    if (typeof numbers[0] === "number"){
        minNum = numbers[0];
        number = numbers[0];
    } else {
        minNum = numbers[0].value();
        number = numbers[0];
    }
    for (var i in numbers){
        if (numbers[i] < minNum){
            if (typeof numbers[i] === "number"){
                minNum = numbers[i];
            } else {
                minNum = numbers[i].value();
            }
            number = numbers[i];
        }
    }
    return number;
}
function sort_min(numbers) {
    var tmp;
    for (var i = 0 ; i < numbers.length ; i++){
        for (var j = 0 ; j < (numbers.length - 1) ; j++){
            if (typeof numbers[j] === "number"){
                if (numbers[j] > numbers[j + 1]){
                    tmp = numbers[j];
                    numbers[j] = numbers[j + 1];
                    numbers[j + 1] = tmp;
                }
            } else {
                if (numbers[j].value() > numbers[j + 1].value()){
                    tmp = numbers[j];
                    numbers[j] = numbers[j + 1];
                    numbers[j + 1] = tmp;
                }
            }
        }
    }
    return numbers;
}
function sort_max(numbers) {
    var tmp;
    for (var i = 0 ; i < numbers.length ; i++){
        for (var j = 0 ; j < (numbers.length - 1) ; j++){
            if (typeof numbers[j] === "number"){
                if (numbers[j] < numbers[j + 1]){
                    tmp = numbers[j];
                    numbers[j] = numbers[j + 1];
                    numbers[j + 1] = tmp;
                }
            } else {
                if (numbers[j].value() < numbers[j + 1].value()){
                    tmp = numbers[j];
                    numbers[j] = numbers[j + 1];
                    numbers[j + 1] = tmp;
                }
            }
        }
    }
    return numbers;
}
module.exports.max = max;
module.exports.min = min;
module.exports.sort_min = sort_min;
module.exports.sort_max = sort_max;