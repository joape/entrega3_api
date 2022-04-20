const Sequelize = require("sequelize");
const db = require("../configs/db-seq");

const Categoria = db.define(
    "categorias", {
        id_categoria: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING(50),
        },
        date_add: {
            type: Sequelize.DATE,
        },
    }, { timestamps: false }
);

module.exports = Categoria;