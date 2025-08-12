"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "azadfx1225",
    database: "tg_bot",
    dialect: "postgres",
    logging: false
});
sequelize.authenticate().then(() => console.log("Connect to DB")).catch((err) => console.log(err.message));
sequelize.sync({ force: false });
exports.default = sequelize;
