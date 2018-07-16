/**
 * @method
 * @file nativeMath.js
 * @desc For create some data structure.
 * @createDate 2018.7.11.
 * @author yhzheng
 */
"use strict";

for (var i in Math){
    module.exports[i] = Math[i];
}