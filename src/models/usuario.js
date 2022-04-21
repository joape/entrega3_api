const Sequelize = require("sequelize");
const db = require("../configs/db-seq");

const Usuario = db.define(
    "usuarios", {
        id_usuario: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING(80),
        },
        apellido: {
            type: Sequelize.STRING(80),
        },
        email: {
            type: Sequelize.STRING(100),
        },
        clave: {
            type: Sequelize.STRING,
        },
        admin: {
            type: Sequelize.INTEGER,
        },
        date_add: {
            type: Sequelize.DATE,
        },
    }, { timestamps: false }
);

module.exports = Usuario;