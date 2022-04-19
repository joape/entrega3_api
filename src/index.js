/*Requiero las libreria*/
const express = require("express"); /*traigo express*/
const cors = require("cors"); // Traigo CORS. Se necesita por un tema de seguridad en los navegadores
const { response } = require("express"); //lo uso para responder desde los manejadores de ruta
const bodyParser = require("body-parser"); //la uso para poder interpretar los post de la UI

//Variables de Entorno
require("dotenv").config();

//Inicializo Express en la variable api 
const api = express();

//Requiero los Routers propios
const productosRouter = require('./routers/productos.router');
const categoriasRouter = require('./routers/categorias.router');
const promocionesRouter = require('./routers/promociones.router');
const authRouter = require('./routers/auth.router');

//Requiero los Middlewares propios
const loggerMiddleware = require('./middlewares/logger.middleware');
const notfoundMiddleware = require('./middlewares/not-found.middleware');
const errorsMiddleware = require('./middlewares/errors.middleware');

//MIDDLEWARES
//Habilitar CORS y middlewares externos. CORS es necesario por un tema de seguridad
api.use(cors()); /*En Prod hay que ser mas especifico */
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json()); //Lo tengo para tener la opcion de recibir JSON

//Middleware GLOBAL
api.use(loggerMiddleware);
// ----------------------FIN ZONA DE MIDDLEWARE ---------------------------------------------------

//-----------------------ENDPOINTS ----------------------------------------------------------------
/*Le digo que escuche en / en el verbo get y agrego la respuesta(callback) -ENDPOINT
Los endpoints son las llegadas desde la UI. 
Se tiene que tener en cuenta el orden porque la prioridad es de arriba hacia abajo*/

//Usamos los Routers
api.use("/productos", productosRouter);
api.use("/categorias", categoriasRouter);
api.use("/promociones", promocionesRouter);
api.use("/auth", authRouter);

// TODO: Manejador de ruta agregar producto a pedido
api.post('/pedido-agregar', (req, res) => {
    try {
        //agregar la servilleta al pedido
    } catch (error) {
        res.send({
            mensaje: "Ocurrio un error",
        });
    }
});

// TODO:Manejador de ruta formulario Contacto
api.post('/contacto', (req, res) => {
    try {
        const datos = req.body;
        //console.log(datos);
        res.send("ok");

    } catch (error) {
        res.statusCode = 400;
        res.send({
            mensaje: "Ocurrio un error:" + error,
        });
    }
});
//------------------FIN ZONA ENDPOINRS------------------------------------------------------

//--------- MIDDLEWARE MANEJO DE ERRORES ---------------------------------------------------
//Manejador para errores. Esta siempre va al final
api.all('/*', notfoundMiddleware);
//Piso el manejador de errors de Express para que no muestre info interna
//Si estoy en desarrollo ejecuto el next para que lo agarre express y me muestre el error.
//api.use(errorsMiddleware); //comentar cuando se esta en desarrollo
//------------------FIN MANEJADORES DE ERRORES--------------------------------------------- 

/*Queda escuchando el puerto 4000 */
api.listen(4000, () => {
    console.log("LA API ESTA FUNCIONANDO")
}); /*http://localhost:4000 */