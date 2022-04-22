const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('./../middlewares/auth.middleware'); //Selecciono solo JWT_SECRET del objeto
const Usuario = require("../models/usuario"); //Con esto puedo usar la BBDD

//clave encriptada (1234 de Joaquin Pedrozo) $2b$10$f3WEsFGPP5LbthrsDJPLO.AYDSIiViTM2AFkkMpxNfxG1TOXJ4zjO
const usuarios = [
    { id: 1, nombre: "Joaquin", apellido: "Pedrozo", email: "joaquin.pedrozo@gmail.com", clave: "$2b$10$f3WEsFGPP5LbthrsDJPLO.AYDSIiViTM2AFkkMpxNfxG1TOXJ4zjO" },
    { id: 2, nombre: "Gustavo", apellido: "Rodriguez", email: "gustavo.rodriguez@gmail.com", clave: "1234" },
    { id: 3, nombre: "Senpai", apellido: "Senpai", email: "Senpai.academy@gmail.com", clave: "1234" }
];

//Creamos el Router
authRouter.post('/login', async(req, res) => {
    try {
        const email = req.body.email.toUpperCase();
        const password = req.body.password;

        const emailEncontrado = await Usuario.findOne({
            where: {
                email: email,
            },
        });
        //console.log(emailEncontrado);

        //Valido que el resultado no este vacio o nulo.
        if (!emailEncontrado) {
            res.status(400).send({ error: "El email ingresado no existe", });
            return; //debe estar para cortar. Sino devuelve ok y da dos return y se crashea
        }

        //Controlo si la password es correcta
        const esigualPassword = await bcrypt.compare(password, emailEncontrado.clave); //aca comparo las pass
        if (!esigualPassword) { //respondo mensaje de error
            res.status(400).send({ error: "La password es incorrecta", });
            return;
        };

        //Si todo salio bien
        //Creo el token
        const token = jwt.sign({
            email: emailEncontrado.email
        }, JWT_SECRET);
        //console.log(token);

        //Login Exitoso
        res.send({ error: null, message: "LOGIN CORRECTO!", token });

    } catch (error) {
        res.statusCode = 404;
        res.send({
            mensaje: "Ocurrio un Error",
            error: error
        });
    }
});

module.exports = authRouter;