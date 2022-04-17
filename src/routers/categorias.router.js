/*Requiero las libreria*/
const express = require("express"); /*traigo express*/

//Info FAKE 
//TODO: Traer los datos de la BBDD
const categorias = [
    { id: 1, nombre: "COCINA,FRUTAS Y VERDURAS" },
    { id: 2, nombre: "FLORES" },
    { id: 3, nombre: "ANIMALES Y INSECTOS" },
    { id: 4, nombre: "VINTAGE" },
    { id: 5, nombre: "NAVIDAD" },
    { id: 6, nombre: "HOJAS" },
    { id: 7, nombre: "ARABESCOS Y PUNTOS" }
];

const CategoriasRouter = express.Router(); //declaro la variable para usar el router de Express

// Manejador de ruta GET categorias NavBar
CategoriasRouter.get('/', (req, res) => {
    try {
        let size = req.query.size; //este es un parametro opcional
        if (size == undefined) { //sino me pasan un size, el valor por defecto es 4
            size = 7;
        }
        res.send(categorias.slice(0, size)); //TODO: Esto va a cambiar al conectarme a la BBDD
    } catch (error) {
        res.send({
            mensaje: "Ocurrio un error",
        });
    }
});

module.exports = CategoriasRouter; //lo que expongo para afuera