//Requiero las libreria
const express = require("express"); //traigo express
const Usuario = require("../models/usuario"); //Con esto puedo usar la BBDD
const UsuariosRouter = express.Router(); //declaro la variable para usar el router de Express
const bcrypt = require("bcrypt"); //Con esto encripto la password

// Manejador de ruta Usuarios GET
UsuariosRouter.get('/', async(req, res) => {
    try {
        let size = req.query.size; //este es un parametro opcional
        if (size == undefined) { //sino me pasan un size, el valor por defecto es 4
            size = 4;
        }

        const usuarios = await Usuario.findAll({
            limit: size
        });

        if (usuarios == "") {
            res.status(400).send({ error: "No existen Usuarios en la base", });
            return; //debe estar para cortar. Sino devuelve ok y da dos return y se crashea            
        } else {
            return res.send(usuarios);
        }

    } catch (error) {
        res.statusCode = 404;
        res.send({
            mensaje: "Error al tratar de insertar el usuario en la BBDD",
            error: error
        });
    }
});

// Manejador de ruta GET con ID
UsuariosRouter.get('/:usuarioId', async(req, res) => {
    try {
        //Primero obtengo el id del producto
        const usuarioID = req.params.productoId;

        //Valido que el id sea numerico.
        if (isNaN(usuarioID)) {
            res.status(400).send({ error: "El ID debe ser numerico.", });
            return; //debe estar para cortar. Sino devuelve ok y da dos return y se crashea
        } else {

            const resultado = await Usuario.findOne({
                where: {
                    id_usuario: usuarioID,
                },
            });

            //Valido que el resultado no este vacio o nulo.
            if (!resultado) {
                res.status(404).send({ error: "Error al traer el usuario o usuario no existe.", });
                return; //debe estar para cortar. Sino devuelve ok y da dos return y se crashea
            }

            return res.send(resultado);
        };
    } catch (error) {
        res.statusCode = 404;
        res.send({
            mensaje: "Error al tratar de insertar el usuario en la BBDD",
            error: error
        });
    }
});

UsuariosRouter.post('/', async(req, res) => {
    try {

        // valido esten todos los campos
        if (!req.body.nombre) {
            res.status(400).send({ error: "Falta el nombre", });
            return;
        }

        if (!req.body.apellido) {
            res.status(400).send({ error: "Falta el apellido", });
            return;
        }

        if (!req.body.email) {
            res.status(400).send({ error: "Falta el email", });
            return;
        }

        if (!req.body.password) {
            res.status(400).send({ error: "Falta el password", });
            return;
        }

        if (!req.body.confpass) {
            res.status(400).send({ error: "Falta confirmacion password", });
            return;
        }

        //evaluo si el email ya existe

        const email = req.body.email.toUpperCase();
        const emailEncontrado = await Usuario.findOne({
            where: {
                email: email,
            },
        });
        //console.log(emailEncontrado);

        //Valido que el resultado no este vacio o nulo.
        if (emailEncontrado) {
            res.status(404).send({ error: "Email ya ingresado.", });
            return; //debe estar para cortar. Sino devuelve ok y da dos return y se crashea
        };

        //evaluo si esta marcado como admin
        if (req.body.opcion === 'true') {
            admin = 1;
        } else {
            admin = 0;
        };

        //Comparo las passwords
        const clave = req.body.password;
        const confclave = req.body.confpass;
        //console.log(confclave);
        if (clave != confclave) {
            res.status(400).send({ error: "Las password no coinciden", });
            return;
        }

        //Codigo para generar un hash con mi clave - SE USA EN EL REGISTRO Y CAMBIO DE PASS
        const salt = await bcrypt.genSalt(10); //Peso de 10 (encrypta 10 veces)
        const hash = await bcrypt.hash(clave, salt);
        //console.log(clave, hash);

        //genero el JSON para pasar a la BBDD
        const datos = {
            nombre: req.body.nombre.toUpperCase(), //paso todo a mayusculas
            apellido: req.body.apellido.toUpperCase(),
            email: req.body.email.toUpperCase(),
            clave: hash, //clave encriptada
            admin: admin,
            date_add: new Date()
        };

        //console.log(datos);
        //Disparo el insert a la BBDD
        const resultado = await Usuario.create(datos);
        console.log(resultado);
        res.send({ message: "Usuario correctamente agregado" });

    } catch (error) {
        res.statusCode = 404;
        res.send({
            mensaje: "Error al tratar de insertar el usuario en la BBDD",
            error: error
        });
    }

});

module.exports = UsuariosRouter; //lo que expongo para afuera