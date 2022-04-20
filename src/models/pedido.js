const Sequelize = require("sequelize");
const db = require("../configs/db-seq");

const Pedido = db.define(
    "pedidos", {
        id_pedido: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        id_usuario: {
            type: Sequelize.BIGINT,
        },
        cant_total: {
            type: Sequelize.INTEGER,
        },
        precio_total: {
            type: Sequelize.DOUBLE,
        },
        date_add: {
            type: Sequelize.DATE,
        },
    }, { timestamps: false }
);

usuario.hasMany(pedido, {
    foreignKey: 'fk_usuarios'
});
pedido.belongsTo(usuario);

module.exports = Pedido;