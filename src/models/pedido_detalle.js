const Sequelize = require("sequelize");
const db = require("../configs/db-seq");

const Pedido_Detalle = db.define(
    "pedido_detalle", {
        id_pedido: {
            type: Sequelize.BIGINT,
            primaryKey: true,
        },
        id_producto: {
            type: Sequelize.BIGINT,
        },
        cant: {
            type: Sequelize.INTEGER,
        },
        precio: {
            type: Sequelize.DOUBLE,
        },
        date_add: {
            type: Sequelize.DATE,
        },
    }, { timestamps: false }
);

pedido.hasMany(pedido_detalle, {
    foreignKey: 'fk_pedidos'
});
pedido_detalle.belongsTo(pedidos);

module.exports = Pedido_Detalle;