EMATH
======
#### EMATH is a module for math.
What's the mean of "EMATH"?<br/>
Just easy? Maybe.<br/>
Energetic? Maybe.<br/>
Effectual? Also right.<br/>
There are so many means of "EMATH".<br/>
All are right.

Functions in each part of emath
---------------------------------
|  Part   |   For   |  The number of functions  |  The number of classes   |
|:------:|:--------------------:|:--------------------:|:--------------:|
|  nativeMath  |   Get the native math in JavaScript.   |  none  |  none  |
|  number  |   Perform common expression operations and provide fractional classes.   |  9  |  1  |
|  compare  |   For compare max and min.  |  4  |  0  |
|  dataStruct  |   For create some data structure.  |  0  |  3  |



New property in this version
---------------------------
- [x] Changed the function expression
- [x] Added part: dataStruct
    - [x] Added class: stack
    - [x] Added class: queue
    - [x] Added class: priority_queue
- [x] Perfect the annotation
- [x] Added the documentation of emath


Download
---------
##### Download with npm:
`$:npm install emath`
##### Or download with yarn:
`$:yarn add emath`

Usage
------
```javascript
/*
* A <Hello world> of emath.
*/
var emath = require("emath");// require emath
var fractions1 = new emath.number.fractions({
    denominator: 10,
    numerator: 1
});// create a fractions
console.log(fractions1.value());// print the value of fractions1,output: 0.1
```
You a use function MCF or LCM to get maximum common factor or least common multiple.
```javascript
var emath = require("emath");
var mcf = emath.number.MCF(20,12);
var lcm = emath.number.LCM(20,12);
console.log("mcf:" + mcf + ",lcm:" + lcm);// output:4,60
```
And there is a important function of emath:expression(exp).
```javascript
var emath = require("emath");
var exp = "1\n---\n5";
var value = emath.number.expression(exp);
console.log(value);// output:0.2
```
You can use sigma by function sigma of function expression.
```javascript
/*
* The first function to use sigma
*/
var emath = require("emath");
var value = emath.number.sigma("2^i",10,{
    name: "i",
    value: 0
});
console.log(value);
```
```javascript
/*
* The second function to use sigma
*/
var emath = require("emath");
var exp = "10\n==\n /\n | 2^i\n \\\n==\ni=0";
var value = emath.number.expression(exp);
console.log(value);
```
And you also can write some expression in a file.<br/>
sigma.math:<br/>
```
10
==
 /
 | 2^i
 \
==
i=0
```
Then use function expression.
```javascript
var emath = require("emath");
var fs = require("fs");
var exp = fs.readFileSync("sigma.math").toString();
var value = emath.number.expression(exp);
console.log(value);
```
And now,we have three data structure:stack,queue and priority_queue.
License
--------
_ISC_