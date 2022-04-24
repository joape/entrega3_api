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

// Manejador de ruta GET con ID
CategoriasRouter.get('/:categoriaId', async(req, res) => {
    try {
        let resultado = null; //declaro null para la busqueda y luego validar

        //Primero obtengo el id del producto
        const categoriaID = req.params.categoriaId;

        //Valido que el id sea numerico.
        if (isNaN(categoriaID)) {
            res.statusCode = 400;
            res.send({
                error: "El ID debe ser numerico.",
            });
            return; //debe estar para cortar. Sino devuelve ok y da dos return y se crashea
        } else {

            const resultado = await Categoria.findOne({
                where: {
                    id_categoria: categoriaID,
                },
            });

            //Valido que el resultado no este vacio o nulo.
            if (!resultado) {
                res.statusCode = 404;
                res.send({
                    error: "Error al traer la categoria o categoria no existe.",
                });
                return; //debe estar para cortar. Sino devuelve ok y da dos return y se crashea
            }

            return res.send(resultado);
        };
    } catch (error) {
        res.statusCode = 404;
        res.send({
            mensaje: "Ocurrio un error",
        });
    }
});

module.exports = CategoriasRouter; //lo que expongo para afuera