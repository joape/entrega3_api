const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('./../middlewares/auth.middleware'); //Selecciono solo JWT_SECRET del objeto

//clave encriptada (1234 de Joaquin Pedrozo) $2b$10$f3WEsFGPP5LbthrsDJPLO.AYDSIiViTM2AFkkMpxNfxG1TOXJ4zjO
const usuarios = [
    { id: 1, nombre: "Joaquin", apellido: "Pedrozo", email: "joaquin.pedrozo@gmail.com", clave: "$2b$10$f3WEsFGPP5LbthrsDJPLO.AYDSIiViTM2AFkkMpxNfxG1TOXJ4zjO" },
    { id: 2, nombre: "Gustavo", apellido: "Rodriguez", email: "gustavo.rodriguez@gmail.com", clave: "1234" },
    { id: 3, nombre: "Senpai", apellido: "Senpai", email: "Senpai.academy@gmail.com", clave: "1234" }
];

//Creamos el Router
authRouter.post('/login', async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        //Codigo para generar un hash con mi clave - SE USA EN EL REGISTRO Y CAMBIO DE PASS
        //const salt = await bcrypt.genSalt(10); //Peso de 10 (encrypta 10 veces)
        //const hash = await bcrypt.hash(password, salt);

        //console.log(email, password, hash);

        //Arranco la validacion del usuario. Busco si existe.
        const usuario = usuarios.find((usuarioBD) => {
            return usuarioBD.email === email;
        });
        //Sino existe el usuario
        if (!usuario) {
            res.status(400).send({ error: "El usuario no existe", });
            return;
        };

        //Controlo si la password es correcta
        const esigualPassword = await bcrypt.compare(password, usuario.clave); //aca comparo las pass
        if (!esigualPassword) { //respondo mensaje de error
            res.send({ error: "La password es incorrecta", });
            return;
        };

        //Si todo salio bien
        //Creo el token
        const token = jwt.sign({
            email: usuario.email
        }, JWT_SECRET);
        //console.log(token);

        //Login Exitoso
        res.send({ error: null, message: "LOGIN CORRECTO!", token });

    } catch (error) {
        res.send({
            mensaje: "Ocurrio un error",
        });
    }
});

module.exports = authRouter;