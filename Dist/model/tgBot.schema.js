"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TelegramBotSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    telegramUserId: { type: Number, required: true },
    message: { type: String, required: true },
}, {
    timestamps: true,
    collection: "Bot",
});
const TelegramBot = (0, mongoose_1.model)("TelegramBot", TelegramBotSchema);
exports.default = TelegramBot;
