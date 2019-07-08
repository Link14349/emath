export class Complex {
    public real : number;
    public imaginary : number;
    constructor(real : number, imaginary : number) {
        this.real = real;
        this.imaginary = imaginary;
    }
    add(complex) : Complex {
        let c = this.copy();
        c.real += complex.real;
        c.imaginary += complex.imaginary;
        return c;
    }
    addTo(complex) : Complex {
        this.real += complex.real;
        this.imaginary += complex.imaginary;
        return this;
    }
    copy() : Complex {
        return new Complex(this.real, this.imaginary);
    }
}