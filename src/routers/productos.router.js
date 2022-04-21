//Requiero las libreria
const express = require("express"); //traigo express
const db = require("../configs/db"); //lo necesito para usar la BBDD
const multer = require("multer"); //lo necesito para subir la foto de los productos
const path = require("path"); //lo necesito por el tema de las direcciones de los archivos
const Producto = require("../models/producto");
const ProductosRouter = express.Router(); //declaro la variable para usar el router de Express

//Configuramos multer
const uploadMiddleware = multer({ dest: path.join("public", "uploads") });

// Manejador de ruta productos GET
ProductosRouter.get('/', async(req, res) => {
    try {
        let size = req.query.size; //este es un parametro opcional
        if (size == undefined) { //sino me pasan un size, el valor por defecto es 4
            size = 4;
        }

        //const responseBD = await db.query('select * from productos');
        //const productos = responseBD.rows;
        const productos = await Producto.findAll({
            limit: size
        });
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

ProductosRouter.post('/', uploadMiddleware.single("foto"), async(req, res) => {
    try {

        //Capturo los datos de la imagen
        const originalFileName = req.file.originalname;
        const filename = req.file.filename;
        //console.log(originalFileName, filename);

        // valido esten todos los campos
        if (!req.body.id_categoria) {
            return res.json({
                sucess: false,
                message: "Falta el id_categoria"
            });
        }

        if (!req.body.codigo) {
            return res.json({
                sucess: false,
                message: "Falta el Codigo de Servilleta"
            });
        }

        if (!req.body.origen) {
            return res.json({
                sucess: false,
                message: "Falta el origen"
            });
        }

        if (!req.body.stock) {
            return res.json({
                sucess: false,
                message: "Falta la cantidad de Stock"
            });
        }

        if (!req.body.precio) {
            return res.json({
                sucess: false,
                message: "Falta el Precio"
            });
        }

        if (!originalFileName) {
            filename = '';
            originalFileName = '';
            return res.json({
                sucess: false,
                message: "Falta la imagen"
            });
        }

        //genero el JSON para pasar a la BBDD
        const datos = {
            id_categoria: req.body.id_categoria,
            codigo: req.body.codigo,
            origen: req.body.origen,
            tamaño: req.body.tamaño,
            stock: req.body.stock,
            precio: req.body.precio,
            imagen: filename,
            imagen_original: originalFileName,
            date_add: new Date()
        };

        //console.log(datos);
        //Disparo el insert a la BBDD
        const resultado = await Producto.create(datos);
        //console.log(resultado);
        res.send({ message: "Producto correctamente insertado" });

    } catch (error) {
        res.statusCode = 404;
        res.send({
            mensaje: "Error al tratar de insertar el producto en la BBDD",
            error: error
        });
    }


});

module.exports = ProductosRouter; //lo que expongo para afuera