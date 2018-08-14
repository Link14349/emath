/**
* @method
* @file linearAlgebra.js
* @desc Provides an interface for linear algebra.
* @createDate 2018.8.11.
* @author yhzheng
*/
"use strict";

var outside = this;

/**
 * @class matrix
 * @classdesc This is the class of matrix.
 * @desc It's for create object and init object.
 */
class matrix
{
    constructor(width,height,value){
        this.type = "matrix";
        this.value = [];
        this.width = width;
        this.height = height;
        if (typeof value === "object"){
            for (var i = 0 ; i < height ; i++){
                this.value[i] = [];
                for (var j = 0 ; j < width ; j++){
                    this.value[i][j] = value[i][j];
                }
            }
        } else {
            for (var i = 0 ; i < height ; i++){
                this.value[i] = [];
                for (var j = 0 ; j < width ; j++){
                    this.value[i][j] = value;
                }
            }
        }
    }
    /**
     * @method
     * @function T
     * @desc For change this matrix to the value of matrix after T.
     */
    T(){
        this.value = outside.T(this).value;
    }
    /**
     * @method
     * @function each
     * @desc For each this matrix.
     */
    each(callback){
        for (var i = 0 ; i < this.width ; i++){
            for (var j = 0 ; j < this.height ; j++){
                callback(j,i,this.value[j][i]);
            }
        }
    }
    /**
     * @method
     * @function add
     * @param {matrix} matrix_ The matrix.
     * @desc For change this matrix to the value of matrix after added another matrix.
     */
    add(matrix_){
        var res = outside.add(this,matrix_);
        if (res)
            this.value = res.value;
    }
     /**
     * @method
     * @function product
     * @param {vector} matrix The matrix or vector
     * @desc For get the value of matrix or vector after product.
     */
    product(matrix) {
        var res = outside.product();
        if (res){
            if (typeof res === "object"){
                this.value = res.value;
                this.width = res.width;
                this.height = res.height;
            } else {
                this.value = res;
                this.width = null;
                this.height = null;
            }
        }
    }
    /**
     * @method
     * @function toString()
     * @desc For return the string of matrix.
     */
    toString(){
        return JSON.stringify(this);
    }
    /**
     * @method
     * @function print()
     * @desc For print the string of matrix.
     */
    print(){
        console.log(this.toString());
    }
    /**
     * @method
     * @function toArray()
     * @desc For return the value of matrix.
     */
    toArray(){
        return this.value;
    }
}

/**
 * @class vector
 * @classdesc This is the class of vector.
 * @desc It's for create object and init object.
 */
class vector extends matrix
{
    constructor(width,value){
        if (typeof value === "object"){
            value = [value];
        }
        super(width,1,value);
        this.type = "vector";
    }
    /**
     * @method
     * @function T
     * @desc For change this vector to the value of vector after T.
     */
    T(){
        var tmp = [];
        if (this.height == 1){
            for (var i = 0 ; i < this.width ; i++){
                tmp[i] = [];
                tmp[i][0] = this.value[0][i];
            }
        } else {
            tmp = [[]];
            for (var i = 0 ; i < this.height ; i++){
                tmp[0][i] = this.value[i][0];
            }
        }
        this.value = tmp;
        tmp = this.width;
        this.width = this.height;
        this.height = tmp;
    }
    /**
     * @method
     * @function each
     * @desc For each this vector.
     */
    each(callback){
        if (this.height == 1){
            for (var i = 0 ; i < this.width ; i++){
                callback(i,this.value[0][i]);
            }
        } else {
            for (var i = 0 ; i < this.height ; i++){
                callback(i,this.value[i][0]);
            }
        }
    }
}
/**
 * @method
 * @function T
 * @param {matrix} matrix_ The matrix.
 * @returns {matrix} The value of matrix after T.
 * @desc For get the value of matrix after T.
 */
function T(matrix_) {
    var tmpMatrix = new matrix(matrix_.height,matrix_.width,0);
    for (var i = 0 ; i < matrix_.width ; i++){
        for (var j = 0 ; j < matrix_.height ; j++){
            tmpMatrix.value[i][j] = matrix_.value[j][i];
        }
    }
    var tmp = matrix_.width;
    matrix_.width = matrix_.height;
    matrix_.height = tmp;
    return tmpMatrix;
}

/**
 * @method
 * @function add
 * @param {matrix} matrix1 The matrix or vector
 * @param {matrix} matrix2 The matrix or vector
 * @returns {matrix} The value of matrix after T.
 * @returns {boolean} If can't add,return this.
 * @desc For get the value of matrix after T.
 */
function add(matrix1,matrix2) {
    var res;
    res = add_matrix(matrix1,matrix2);
    if (res) return res;
    res = add_vector(matrix1,matrix2);
    if (res) return res;
    if (matrix1.height == 1 && matrix1.width == matrix2.width){
        for (var i = 0 ; i < matrix1.width ; i++){
            for (var j = 0 ; j < matrix2.height ; j++){
                matrix2.value[j][i] += matrix1.value[0][i];
            }
        }
        return matrix2;
    }
    if (matrix1.width == 1 && matrix1.height == matrix2.height){
        for (var i = 0 ; i < matrix1.height ; i++){
            for (var j = 0 ; j < matrix2.width ; j++){
                matrix2.value[i][j] += matrix1.value[i][0];
            }
        }
        return matrix2;
    }
    return false;
}

/**
 * @method
 * @function add_matrix
 * @param {matrix} matrix1 The matrix
 * @param {matrix} matrix2 The matrix
 * @returns {matrix} The value of matrix after added.
 * @returns {boolean} If can't add,return this.
 * @desc For get the value of matrix after added.
 */
function add_matrix(matrix1,matrix2) {
    if (matrix1.type != "matrix" || matrix2.type != "matrix"){
        return false;
    }
    if (matrix1.width == matrix2.width && matrix1.height == matrix2.height){
        for (var i = 0 ; i < matrix1.height ; i++){
            for (var j = 0 ; j < matrix1.width ; j++){
                matrix1.value[i][j] += matrix2.value[i][j];
            }
        }
    } else if (matrix1.width == matrix2.height && matrix1.height == matrix2.width){
        matrix1.T();
        return add_matrix(matrix1,matrix2);
    } else {
        return false;
    }
}

/**
 * @method
 * @function add_vector
 * @param {vector} vector1 The vector
 * @param {vector} vector2 The vector
 * @returns {vector} The value of vector after added.
 * @returns {boolean} If can't add,return this.
 * @desc For get the value of vector after added.
 */
function add_vector(vector1,vector2) {
    if (vector1.type != "vector" || vector2.type != "vector"){
        return false;
    }
    if (vector1.width == vector2.width){
        for (var i = 0 ; i < vector1.width ; i++){
            vector1.value[0][i] += vector2.value[0][i];
        }
    } else if (vector1.width == vector2.height){
        vector1.T();
        add_vector(vector1,vector2);
    } else {
        return false;
    }
}


/**
 * @method
 * @function product
 * @param {matrix} matrix1 The matrix or vector
 * @param {matrix} matrix2 The matrix or vector
 * @returns {matrix} The value of matrix after product.
 * @desc For get the value of matrix or vector after product.
 */
function product(matrix1,matrix2) {
    if (matrix1.type == "matrix" && matrix2.type == "matrix"){
        return matrix_product(matrix1,matrix2);
    }
    if (matrix1.type == "vector" && matrix2.type == "vector"){
        return vector_product(matrix1,matrix2);
    }
    if (matrix1.type == "matrix"){
        if (matrix2.width == 1){
            for (var i = 0 ; i < matrix1.height ; i++){
                for (var j = 0 ; j < matrix1.width ; j++){
                    matrix1.value[i][j] *= matrix2.value[i][0];
                }
            }
        } else {
            for (var i = 0 ; i < matrix1.height ; i++){
                for (var j = 0 ; j < matrix1.width ; j++){
                    matrix1.value[i][j] *= matrix2.value[0][i];
                }
            }
        }
    } else {
        if (matrix1.width == 1){
            for (var i = 0 ; i < matrix2.height ; i++){
                for (var j = 0 ; j < matrix2.width ; j++){
                    matrix2.value[i][j] *= matrix2.value[i][0];
                }
            }
        } else {
            for (var i = 0 ; i < matrix2.height ; i++){
                for (var j = 0 ; j < matrix1.width ; j++){
                    matrix2.value[i][j] *= matrix1.value[0][i];
                }
            }
        }
    }
}

/**
 * @method
 * @function matrix_product
 * @param {matrix} matrix1 The matrix
 * @param {matrix} matrix2 The matrix
 * @returns {matrix} The value of matrix after product.
 * @desc For get the value of matrix after product.
 */
function matrix_product(matrix1,matrix2) {
    if (matrix1.width != matrix2.height){
        return false;
    }
    var matrix3 = new matrix(matrix1.height,matrix2.width,0);
    matrix3.each(function (i,j) {
        for (var k = 0 ; k < matrix1.width/* or matrix2.width */ ; k++){
            matrix3.value[i][j] += matrix1.value[i][k] * matrix2.value[k][j];
        }
    });
    return matrix3;
}

/**
 * @method
 * @function vector_product
 * @param {vector} vector1 The vector
 * @param {vector} vector2 The vector
 * @returns {number} The value of vector after product.
 * @desc For get the value of vector after product.
 */
function vector_product(vector1,vector2) {
    var num = 0;
    if (vector1.width != 1){
        vector1.T();
    }
    if (vector2.width != 1){
        vector2.T();
    }
    if (vector1.height < vector2.height){
        vector1.each(function (i,value) {
            num += value * vector2.value[i][0];
        });
    } else {
        vector2.each(function (i,value) {
            num += value * vector1.value[i][0];
        });
    }
    return num;
}

module.exports.matrix = matrix;
module.exports.vector = vector;
module.exports.T = T;
module.exports.add = add;
module.exports.add_matrix = add_matrix;
module.exports.add_vector = add_vector;
module.exports.matrix_product = matrix_product;
module.exports.vector_product = vector_product;
module.exports.product = product;