import { Model, DataTypes } from "sequelize"
import sequelize from "../config/database"

export class TelegramBot extends Model {
    public id!: number;
    public name!: string;
    public telegramUserId!: number;
    public message!: string;
}

TelegramBot.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telegramUserId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
},
{
    sequelize,
    tableName: "Bot",
    timestamps: true
})

export default TelegramBot;