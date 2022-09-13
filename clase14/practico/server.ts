import express from "express";
import Superfice from './src/Superficie';
import Perimetro from "./src/Perimetro";

const p: Perimetro = new Perimetro(10, 5, 3);
const s: Superfice = new Superfice(10, 5, 3);

const app = express();

app.get("/pc", (req, res) => {
 res.send({
   tipo: "perimetro",
   figura: "cuadrado",
   lado: p.getLargo(),
   perimetro: p.getPerimetroCuadrado()
 });
});

app.get("/pr", (req, res) => {
    res.send({
      tipo: "perimetro",
      figura: "rectangulo",
      largo: p.getLargo(),
      ancho: p.getAncho(),
      perimetro: p.getPerimetroRectangulo()
    });
});

app.get("/pcir", (req, res) => {
    res.send({
      tipo: "perimetro",
      figura: "circulo",
      radio: p.getRadio(),
      circunferencia: p.getCircunferencia()
    });
});

app.get("/sc", (req, res) => {
    res.send({
      tipo: "area",
      figura: "cuadrado",
      lado: s.getLargo(),
      superfice: s.getSuperficeCuadrado()
    });
});

app.get("/sr", (req, res) => {
    res.send({
      tipo: "area",
      figura: "rectangulo",
      largo: s.getLargo(),
      ancho: s.getAncho(),
      superfice: s.getSuperficeRectangulo()
    });
});

app.get("/scir", (req, res) => {
    res.send({
      tipo: "area",
      figura: "rcirculo",
      radio: s.getLargo(),
      ancho: s.getRadio(),
      superfice: s.getCirculo()
    });
});


const PORT = 8080;
app.listen(PORT, () => {
 console.log(`conectado al puerto: ${PORT}`);
});
