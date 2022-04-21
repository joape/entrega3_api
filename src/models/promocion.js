const Sequelize = require("sequelize");
const db = require("../configs/db-seq");

const Promocion = db.define(
    "promociones", {
        id_promocion: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        texto: {
            type: Sequelize.STRING(50),
        },
        destacada: {
            type: Sequelize.INTEGER,
        },
        date_add: {
            type: Sequelize.DATE,
        },
    }, { timestamps: false }
);

module.exports = Promocion;