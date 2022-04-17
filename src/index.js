/*Requiero las libreria*/
const express = require("express"); /*traigo express*/
const cors = require("cors"); // Traigo CORS. Se necesita por un tema de seguridad en los navegadores
const { response } = require("express"); //lo uso para responder desde los manejadores de ruta
const bodyParser = require("body-parser"); //la uso para poder interpretar los post de la UI
const fs = require("fs"); //la uso para el logger global del middleware

/*Inicializo Express en la variable api */
const api = express();

//Requiero los Routers propios
const productosRouter = require('./routers/productos.router');
const categoriasRouter = require('./routers/categorias.router');
const promocionesRouter = require('./routers/promociones.router');

//MIDDLEWARES
//Habilitar CORS. Necesario por un tema de seguridad
api.use(cors()); /*En Prod hay que ser mas especifico */
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json()); //Lo tengo para tener la opcion de recibir JSON

//Middleware GLOBAL
/*api.use((req, res, next) => { //si le saco el '/*' se ejecuta siempre, o sea es global
    const log = `Ingreso a:${req.url} a las ${new Date()}`; //genero la linea  
    fs.writeFile('./data/log.txt', log, error => { //aca grabo y saco por consola si todo estuvo ok o paso algo.
            if (error)
                console.log(error)
            else
                console.log('El archivo fue creado')
        })
        //console.log(log); //chequeo que entra
    next();
});*/

// ------------FIN ZONA DE MIDDLEWARE ---------------------------------------------------

//Info FAKE 
//TODO: Traer los datos de la BBDD

const usuarios = [
    { id: 1, nombre: "Joaquin", apellido: "Pedrozo", email: "joaquin.pedrozo@gmail.com", clave: "1234" },
    { id: 2, nombre: "Gustavo", apellido: "Rodriguez", email: "gustavo.rodriguez@gmail.com", clave: "1234" },
    { id: 3, nombre: "Senpai", apellido: "Senpai", email: "Senpai.academy@gmail.com", clave: "1234" }
];

// -------------------------------FIN INFO FAKE ---------------------------------------------------

//ENDPOINTS 
/*Le digo que escuche en / en el verbo get y agrego la respuesta(callback) -ENDPOINT
Los endpoints son las llegadas desde la UI. 
Se tiene que tener en cuenta el orden porque la prioridad es de arriba hacia abajo*/

//Usamos los Routers
api.use("/productos", productosRouter);
api.use("/categorias", categoriasRouter);
api.use("/promociones", promocionesRouter);

// Manejador de ruta agregar producto a pedido
api.post('/pedido-agregar', (req, res) => {
    try {
        //agregar la servilleta al pedido
    } catch (error) {
        res.send({
            mensaje: "Ocurrio un error",
        });
    }
});

// Manejador de ruta formulario Contacto
api.post('/usuarios', (req, res) => {
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

// Manejador de ruta Login
api.post('/login', (req, res) => {
    try {
        //agregar la servilleta al pedido
    } catch (error) {
        res.send({
            mensaje: "Ocurrio un error",
        });
    }
});
//------------------FIN ZONA ENDPOINRS---------------------------------------------

//--------- MANEJO DE ERRORES -----------------------------------------------------
//Manejador para errores. Esta siempre va al final
api.get('/*', (req, res) => {
    try {
        res.statusCode = 404; //TODO:mover statuscode a archivo separado
        res.send({
            mensaje: "¡La ruta no existe!",
        });
    } catch (error) {
        res.send({
            mensaje: "Ocurrio un error",
        });
    }
});

//Piso el manejador de errors de Express para que no muestre info interna
//Si estoy en desarrollo ejecuto el next para que lo agarre express y me muestre el error.
api.use((error, req, res, next) => {
    res.statusCode = 400;
    res.send("Error");
    //next();
});

/*------------------FIN MANEJADORES DE ERRORES--------------------------------------------- */

/*Queda escuchando el puerto 4000 */
api.listen(4000, () => {
    console.log("LA API ESTA FUNCIONANDO")
}); /*http://localhost:4000 */