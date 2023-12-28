import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("twitter", "root", "mysql", {
    host: "localhost",
    dialect: "mysql",
    
  });