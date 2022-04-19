/*Requiero las libreria*/
const express = require("express"); /*traigo express*/
const { authMiddleware } = require('./../middlewares/auth.middleware'); //Selecciono solo authMiddleware del objeto

//Info FAKE 
//TODO: Traer los datos de la BBDD
const promociones = [
    { id: 1, texto: "Promocion de Febrero !!!" },
    { id: 2, texto: "Promocion de Marzo !!!" },
    { id: 3, texto: "Promocion de Abril !!!" }
];

const PromocionesRouter = express.Router(); //declaro la variable para usar el router de Express

// Manejador de ruta GET de Promociones de la Home
//PromocionesRouter.get('/:promocionID', authMiddleware, (req, res) => {
PromocionesRouter.get('/:promocionID', (req, res) => {
    try {
        let resultado = null; //declaro null para la busqueda y luego validar        
        const promocionID = req.params.promocionID; //Obtengo el id del producto

        //Valido que el id sea numerico.
        if (isNaN(promocionID)) {
            res.statusCode = 400;
            res.send({
                error: "El ID debe ser numerico.",
            });
            return; //debe estar para cortar. Sino devuelve ok y da dos return y se crashea
        } else {
            //Busco el productoID en el Array, Luego en la BBDD.
            //uso foreach que es un metodo que tienen los arrays.
            promociones.forEach((promocion) => {
                if (promocion.id == promocionID) {
                    resultado = promocion;
                };
            });
        };

        //Valido que el resultado no este vacio o nulo.
        if (resultado === null) {
            res.statusCode = 404;
            res.send({
                error: "Error al traer la promocion o promocion no existe.",
            });
            return; //debe estar para cortar. Sino devuelve ok y da dos return y se crashea
        }

        //Respondo lo encontrado
        res.send(resultado);

    } catch (error) {
        res.send({
            mensaje: error,
        });
    }
});

module.exports = PromocionesRouter;