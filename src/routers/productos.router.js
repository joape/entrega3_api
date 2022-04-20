/*Requiero las libreria*/
const express = require("express"); /*traigo express*/
const db = require("../configs/db");
const Producto = require("../models/producto");

const ProductosRouter = express.Router(); //declaro la variable para usar el router de Express

// Manejador de ruta productos GET
ProductosRouter.get('/', async(req, res) => {
    try {
        let size = req.query.size; //este es un parametro opcional
        if (size == undefined) { //sino me pasan un size, el valor por defecto es 4
            size = 4;
        }

        //const responseBD = await db.query('select * from productos');
        //const productos = responseBD.rows;
        const productos = await Producto.findAll();
        return res.send(productos);

    } catch (error) {
        res.statusCode = 404;
        res.send({
            mensaje: "Ocurrio un error al traer los productos",
        });
    }
});

// Manejador de ruta GET con ID
ProductosRouter.get('/:productoId', async(req, res) => {
    try {
        let resultado = null; //declaro null para la busqueda y luego validar

        //Primero obtengo el id del producto
        const productoID = req.params.productoId;

        //Valido que el id sea numerico.
        if (isNaN(productoID)) {
            res.statusCode = 400;
            res.send({
                error: "El ID debe ser numerico.",
            });
            return; //debe estar para cortar. Sino devuelve ok y da dos return y se crashea
        } else {

            //const responseBD = await db.query('select * from productos where id_producto=$1', [productoID]);
            //const resultado = responseBD.rows[0];
            const resultado = await Producto.findOne({
                where: {
                    id_producto: productoID,
                },
            });

            //Valido que el resultado no este vacio o nulo.
            if (!resultado) {
                res.statusCode = 404;
                res.send({
                    error: "Error al traer el producto o producto no existe.",
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

module.exports = ProductosRouter; //lo que expongo para afuera