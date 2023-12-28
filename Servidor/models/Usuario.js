import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Tweet } from "./Tweet.js";


export const Usuario = sequelize.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    foto: {
        type: DataTypes.STRING
    }
});


Usuario.hasMany(Tweet, { foreignKey: "UsuarioId" });
Tweet.belongsTo(Usuario, { foreignKey: "UsuarioId" });
