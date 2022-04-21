const Sequelize = require("sequelize");
const db = require("../configs/db-seq");
const Categoria = require("./categoria");

const Producto = db.define(
    "productos", {
        id_producto: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        id_categoria: {
            type: Sequelize.BIGINT,
            references: {
                model: Categoria,
                key: 'id_categoria'
            }
        },
        codigo: {
            type: Sequelize.STRING(20),
        },
        origen: {
            type: Sequelize.STRING(50),
        },
        tamaño: {
            type: Sequelize.STRING(50),
        },
        stock: {
            type: Sequelize.INTEGER,
        },
        precio: {
            type: Sequelize.DOUBLE,
        },
        imagen: {
            type: Sequelize.STRING(100),
        },
        imagen_original: {
            type: Sequelize.STRING(50),
        },
        date_add: {
            type: Sequelize.DATE,
        },
    }, { timestamps: false }
);

Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' });

module.exports = Producto;