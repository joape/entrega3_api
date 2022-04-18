const notfoundMiddleware = (req, res) => {
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
};

module.exports = notfoundMiddleware;