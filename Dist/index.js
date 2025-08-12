"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./config/database"));
const TgBot_ctr_1 = require("./controller/TgBot.ctr");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
database_1.default.sync({ force: false })
    .then(() => {
    console.log("Baza bilan ulanish muvaffaqiyatli");
    // Bot
    (0, TgBot_ctr_1.startTelegramBot)();
    // Server
    app.listen(PORT, () => {
        console.log(`server running: ${PORT}`);
    });
})
    .catch((err) => {
    console.error("Baza bilan ulanishda xatolik:", err);
});
