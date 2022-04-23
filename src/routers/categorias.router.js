/*Requiero las libreria*/
const express = require("express"); /*traigo express*/
const Categoria = require("../models/categoria");

const CategoriasRouter = express.Router(); //declaro la variable para usar el router de Express

// Manejador de ruta GET categorias NavBar
CategoriasRouter.get('/', async(req, res) => {
    try {
        let size = req.query.size; //este es un parametro opcional
        if (size == undefined) { //sino me pasan un size, el valor por defecto es 7
            size = 7;
        }
        const categorias = await Categoria.findAll({
            limit: size
        });
        return res.send(categorias);

    } catch (error) {
        res.statusCode = 404;
        res.send({
            mensaje: "Ocurrio un error",
        });
    }
});

module.exports = CategoriasRouter; //lo que expongo para afuera