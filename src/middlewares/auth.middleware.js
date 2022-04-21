const jwt = require("jsonwebtoken");
const JWT_SECRET = "joaquin";

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); //Aca lo va a recibir de la API de la UI.

    //Si no me mandan un Token, mando un mensaje de error 401 Acceso denegado
    if (!token) {
        return res.status(401).send({ error: "Acceso Denegado", });
    }

    //Valido que el Token sean Valido. 
    //Se debe usar Try-catch porque el JWT puede tirar una excepcion en caso no sea valido
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).send({ error: "El token es invalido" });
    }

};

module.exports = { authMiddleware, JWT_SECRET }; //Exporto un objeto con los dos elementos