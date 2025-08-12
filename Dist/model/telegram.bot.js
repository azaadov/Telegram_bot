"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBot = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class TelegramBot extends sequelize_1.Model {
}
exports.TelegramBot = TelegramBot;
TelegramBot.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    telegramUserId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize: database_1.default,
    tableName: "Bot",
    timestamps: true
});
exports.default = TelegramBot;
