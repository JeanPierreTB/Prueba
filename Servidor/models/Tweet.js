import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Tweet = sequelize.define("Tweet", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comentario: {
        type: DataTypes.STRING
    }
});



