"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Complex = /** @class */ (function () {
    function Complex(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }
    Complex.prototype.add = function (complex) {
        var c = this.copy();
        c.real += complex.real;
        c.imaginary += complex.imaginary;
        return c;
    };
    Complex.prototype.addTo = function (complex) {
        this.real += complex.real;
        this.imaginary += complex.imaginary;
        return this;
    };
    Complex.prototype.copy = function () {
        return new Complex(this.real, this.imaginary);
    };
    return Complex;
}());
exports.Complex = Complex;
//# sourceMappingURL=complex.js.map