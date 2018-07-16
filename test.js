var emath = require("./index");
var fs = require("fs");
console.log(emath.number.expression(fs.readFileSync("test.math").toString()));