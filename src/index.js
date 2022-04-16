/*Requiero las libreria*/
const express = require("express"); /*traigo express*/
const cors = require("cors"); // Traigo CORS. Se necesita por un tema de seguridad en los navegadores
const { response } = require("express"); //lo uso para responder desde los manejadores de ruta
const bodyParser = require("body-parser"); //la uso para poder interpretar los post de la UI
const fs = require("fs"); //la uso para el logger global del middleware

/*Inicializo Express en la variable api */
const api = express();

//Habilitar CORS. Necesario por un tema de seguridad
api.use(cors()); /*En Prod hay que ser mas especifico */

//MIDDLEWARES
//Middleware GLOBAL
api.use((req, res, next) => { //si le saco el '/*' se ejecuta siempre, o sea es global
    const log = `Ingreso a:${req.url} a las ${new Date()}`; //genero la linea  
    fs.writeFile('./data/log.txt', log, error => { //aca grabo y saco por consola si todo estuvo ok o paso algo.
            if (error)
                console.log(error)
            else
                console.log('El archivo fue creado')
        })
        //console.log(log); //chequeo que entra
    next();
});

// ------------FIN ZONA DE MIDDLEWARE ---------------------------------------------------

//Info FAKE 
//TODO: Traer los datos de la BBDD
const productos = [
    { id: 1, codigo: "INS400", imagen: "servilleta1.jpg", origen: "China", tamaño: "30x30", cantidad: "320", precio: "15" },
    { id: 2, codigo: "FLO400", imagen: "servilleta2.jpg", origen: "China", tamaño: "30x30", cantidad: "250", precio: "15" },
    { id: 3, codigo: "ANI400", imagen: "servilleta3.jpg", origen: "China", tamaño: "30x30", cantidad: "120", precio: "15" },
    { id: 4, codigo: "ANI500", imagen: "servilleta4.jpg", origen: "China", tamaño: "30x30", cantidad: "200", precio: "15" }
];

const promociones = [
    { id: 1, texto: "Promocion de Febrero !!!" },
    { id: 2, texto: "Promocion de Marzo !!!" },
    { id: 3, texto: "Promocion de Abril !!!" }
];

const usuarios = [
    { id: 1, nombre: "Joaquin", apellido: "Pedrozo", email: "joaquin.pedrozo@gmail.com", clave: "1234" },
    { id: 2, nombre: "Gustavo", apellido: "Rodriguez", email: "gustavo.rodriguez@gmail.com", clave: "1234" },
    { id: 3, nombre: "Senpai", apellido: "Senpai", email: "Senpai.academy@gmail.com", clave: "1234" }
];

const categorias = [
    { id: 1, nombre: "COCINA,FRUTAS Y VERDURAS" },
    { id: 2, nombre: "FLORES" },
    { id: 3, nombre: "ANIMALES Y INSECTOS" },
    { id: 4, nombre: "VINTAGE" },
    { id: 5, nombre: "NAVIDAD" },
    { id: 6, nombre: "HOJAS" },
    { id: 7, nombre: "ARABESCOS Y PUNTOS" }
];
// -------------------------------FIN INFO FAKE ---------------------------------------------------

//ENDPOINTS 
/*Le digo que escuche en / en el verbo get y agrego la respuesta(callback) -ENDPOINT
Los endpoints son las llegadas desde la UI. 
Se tiene que tener en cuenta el orden porque la prioridad es de arriba hacia abajo*/

// Manejador de ruta productos de la home
api.get('/productos', (req, res) => {
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

// Manejador de ruta detalle producto
api.get('/producto/:productoId', (req, res) => {
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
api.post('/contacto', (req, res) => {
    try {
        const datos = req.body;
        console.log(datos);

        response.send("ok");

    } catch (error) {
        res.send({
            mensaje: "Ocurrio un error",
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

// Manejador de ruta promociones de la Home
api.get('/promociones/:promocionID', (req, res) => {
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
            mensaje: "Ocurrio un error",
        });
    }
});

// Manejador de ruta categorias NavBar
api.get('/categorias', (req, res) => {
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