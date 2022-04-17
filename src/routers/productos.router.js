/*Requiero las libreria*/
const express = require("express"); /*traigo express*/


//Info FAKE 
//TODO: Traer los datos de la BBDD
const productos = [
    { id: 1, codigo: "INS400", imagen: "servilleta1.jpg", origen: "China", tamaño: "30x30", cantidad: "320", precio: "15" },
    { id: 2, codigo: "FLO400", imagen: "servilleta2.jpg", origen: "China", tamaño: "30x30", cantidad: "250", precio: "15" },
    { id: 3, codigo: "ANI400", imagen: "servilleta3.jpg", origen: "China", tamaño: "30x30", cantidad: "120", precio: "15" },
    { id: 4, codigo: "ANI500", imagen: "servilleta4.jpg", origen: "China", tamaño: "30x30", cantidad: "200", precio: "15" }
];

const ProductosRouter = express.Router(); //declaro la variable para usar el router de Express

// Manejador de ruta productos GET
ProductosRouter.get('/', (req, res) => {
    try {
        let size = req.query.size; //este es un parametro opcional
        if (size == undefined) { //sino me pasan un size, el valor por defecto es 4
            size = 4;
        }
        res.send(productos.slice(0, size));
    } catch (error) {
        res.send({
            mensaje: "Ocurrio un error",
        });
    }
});

// Manejador de ruta GET con ID
ProductosRouter.get('/:productoId', (req, res) => {
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
            //Busco el productoID en el Array, Luego en la BBDD.
            //uso foreach que es un metodo que tienen los arrays.
            productos.forEach((producto) => {
                if (producto.id == productoID) {
                    resultado = producto;
                };
            });
        };

        //Valido que el resultado no este vacio o nulo.
        if (resultado === null) {
            res.statusCode = 404;
            res.send({
                error: "Error al traer el producto o producto no existe.",
            });
            return; //debe estar para cortar. Sino devuelve ok y da dos return y se crashea
        }

        //Respondo lo encontrado
        res.send(resultado);
    } catch (error) {
        res.send({
            mensaje: "Ocurrio un error",
        });
    }
});

module.exports = ProductosRouter; //lo que expongo para afuera