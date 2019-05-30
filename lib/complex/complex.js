class Complex {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }
    add(complex) {
        let c = this.copy();
        c.real += complex.real;
        c.imaginary += complex.imaginary;
        return c;
    }
    addTo(complex) {
        this.real += complex.real;
        this.imaginary += complex.imaginary;
        return this;
    }
    copy() {
        return new Complex(this.real, this.imaginary);
    }
}

module.exports = Complex;