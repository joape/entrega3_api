const fs = require("fs"); //la uso para el logger global del middleware

const loggerMiddleware = (req, res, next) => { //si le saco el '/*' se ejecuta siempre, o sea es global
    const log = `Ingreso a:${req.url} a las ${new Date()}\n`; //genero la linea  
    fs.writeFile('./data/log.txt', log, { flag: "a+" }, error => { //aca grabo y saco por consola si todo estuvo ok o paso algo.
            if (error)
                console.log(error)
            else
                console.log('logger ejecutado')
        })
        //console.log(log); //chequeo que entra
    next();
};

module.exports = loggerMiddleware;