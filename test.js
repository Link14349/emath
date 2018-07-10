var fs = require("fs");
var emath = require("./index");
console.log(emath.number.expression(fs.readFileSync("test.math").toString()));