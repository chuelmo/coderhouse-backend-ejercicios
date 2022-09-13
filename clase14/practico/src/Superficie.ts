/* En otro archivo llamado superficie.ts se implementará una clase llamada Superficie que contenga tres métodos estáticos para calcular la superficie de las mismas tres figuras.
*/
export default class Superfice {
    private largo: number;
    private ancho: number;
    private radio: number;

    constructor(largo: number, ancho: number, radio: number) {
        this.largo = largo;
        this.ancho = ancho;
        this.radio = radio;
    }

    getSuperficeCuadrado(): number {
        return (this.largo * this.largo);
    }

    getSuperficeRectangulo(): number {
        return (this.largo * this.ancho);
    }

    getCirculo(): number {
        return (this.radio * this.radio * Math.PI);
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