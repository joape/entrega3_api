const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('./../middlewares/auth.middleware'); //Selecciono solo JWT_SECRET del objeto
const Usuario = require("../models/usuario"); //Con esto puedo usar la BBDD

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
        res.send({ error: null, message: "LOGIN CORRECTO!", token, admin: emailEncontrado.admin });

    } catch (error) {
        res.statusCode = 404;
        res.send({
            mensaje: "Ocurrio un Error",
            error: error
        });
    }
});

module.exports = authRouter;