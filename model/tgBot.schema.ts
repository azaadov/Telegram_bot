import mongoose, { Document, Schema, model } from "mongoose";

export interface ITelegramBot extends Document {
  name: string;
  telegramUserId: number; 
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TelegramBotSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    telegramUserId: { type: Number, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true, 
    collection: "Bot", 
  }
);

const TelegramBot = model<ITelegramBot>("TelegramBot", TelegramBotSchema);

export default TelegramBot;
