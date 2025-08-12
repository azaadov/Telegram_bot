import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { startTelegramBot } from "./controller/TgBot.ctr";
import connectedDB from "./config/database";
import usersRouter from "./router/users.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

//router
app.use(usersRouter)

connectedDB()

async function startApp() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
    });
    console.log("MongoDB bilan ulanish muvaffaqiyatli");

    await startTelegramBot();
    console.log("Telegram bot ishga tushdi");

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (err) {
    console.error("Xatolik yuz berdi:", err);
    process.exit(1);
  }
}

startApp();
