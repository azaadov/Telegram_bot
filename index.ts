import  express  from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()
import sequelize from "./config/database";
import { startTelegramBot } from "./controller/TgBot.ctr";



const app = express()
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())



sequelize.sync({ force: false })
  .then(() => {
    console.log("Baza bilan ulanish muvaffaqiyatli");

    // Bot
    startTelegramBot();

    // Server
    app.listen(PORT, () => {
      console.log(`server running: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Baza bilan ulanishda xatolik:", err);
  });
