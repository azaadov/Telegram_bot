import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "azadfx1225",
    database: "tg_bot",
    dialect: "postgres",
    logging: false
})


sequelize.authenticate().then(() =>console.log("Connect to DB")
).catch((err) => console.log(err.message))

sequelize.sync({force: false})

export default sequelize