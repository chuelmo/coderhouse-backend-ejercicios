/*
Se implementará una clase llamada Perimetro que contenga tres métodos estáticos para calcular el perímetro de un cuadrado, un rectángulo y un círculo. Esta clase se guardará en un archivo llamado perimetro.ts
*/
export default class Perimetro {
    private largo: number;
    private ancho: number;
    private radio: number;

    constructor(largo: number, ancho: number, radio: number) {
        this.largo = largo;
        this.ancho = ancho;
        this.radio = radio;
    }

    getPerimetroCuadrado(): number {
        return this.largo * 4;
    }

    getPerimetroRectangulo(): number {
        return ((this.largo * 2) + (this.ancho * 2));
    }

    getCircunferencia(): number {
        return (this.radio * 2 * Math.PI);
    }

    getLargo(): number {
        return this.largo;
    }

    getAncho(): number {
        return this.ancho;
    }

    getRadio(): number {
        return this.radio;
    }
}