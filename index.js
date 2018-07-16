/**
 * @method
 * @file index.js
 * @desc Integration part
 * @createDate 2018.7.11.
 * @author yhzheng
 */

"use strict";
// require
var native = require("./lib/nativeMath");
var number = require("./lib/number");
var compare = require("./lib/compare");
var dataStruct = require("./lib/dataStruct");

// Integration
module.exports.native = native;
module.exports.number = number;
module.exports.compare = compare;
module.exports.dataStruct = dataStruct;