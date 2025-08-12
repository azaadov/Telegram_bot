import TelegramBot from "node-telegram-bot-api";
import { instagramGetUrl } from "instagram-url-direct";
import TelegramBotModel from "../model/tgBot.schema"
import dotenv from "dotenv";
dotenv.config()

const bot = new TelegramBot(process.env.BOT_TOKEN!, { polling: true });

export function startTelegramBot() {

  bot.setMyCommands([
    { command: "start", description: "Botni ishga tushirish" },
  ]);

  const botUsername = process.env.BOT_USERNAME;

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    const existingUser = await TelegramBotModel.findOne({ telegramUserId: chatId });
    
    if (!existingUser) {
      const newUser = new TelegramBotModel({
        name: msg.from?.first_name || "NoName",
        telegramUserId: chatId,
        message: "/start tugmasi bosildi",
      });
      await newUser.save();
    }


    bot.sendMessage(chatId, 
      `Assalomu alaykum! 👋\n` +
      `Menga link yuboring, men sizga video topib beraman.\n` +
      `Iltimos, quyidagilardan birini yuboring:\n` +
      `- To‘liq post havolasi\n` +
      `- Reel havolasi\n` +
      `- Story havolasi\n`
    );
  });

  bot.on("message", async (msg) => {
    if (msg.text && msg.text.startsWith("/start")) return;

    const chatId = msg.chat.id;
    const url = msg.text?.trim();

    if (!url) return bot.sendMessage(chatId, "Iltimos, Instagram link yuboring.");

    if (!/https?:\/\/(www\.)?instagram\.com\/.+/i.test(url)) {
      return bot.sendMessage(chatId, "Bu Instagram havolasi emas. To‘liq post/reel havolasini yuboring.");
    }

    const loadingMsg = await bot.sendMessage(chatId, "Yuklanmoqda... ⏳ Iltimos, biroz kuting.");

    try {
      const data = await instagramGetUrl(url);
      console.log("instagramGetUrl natija:", data);

      if (data.post_info?.is_private) {
        await bot.editMessageText("Ushbu akkaunt private — media olinmaydi.", { chat_id: chatId, message_id: loadingMsg.message_id });
        return;
      }

      if (!data.url_list || data.url_list.length === 0) {
        await bot.editMessageText("Media topilmadi yoki bu post qo‘llab-quvvatlanmaydi.", { chat_id: chatId, message_id: loadingMsg.message_id });
        return;
      }

      await bot.deleteMessage(chatId, loadingMsg.message_id);

      for (const mediaUrl of data.url_list) {
        if (/\.(mp4|mov)(\?|$)/i.test(mediaUrl) || /video/.test(data.media_details?.[0]?.type)) {
          await bot.sendVideo(chatId, mediaUrl, {
            caption: `❤️${botUsername} orqali yuklab olindi🚀 📥`
          }).catch(async (err) => {
            console.error("sendVideo xato:", err);
            await bot.sendMessage(chatId, "Video jo'natishda xatolik yuz berdi");
          });
        } else {
          await bot.sendPhoto(chatId, mediaUrl).catch(async (err) => {
            console.error("sendPhoto xato:", err);
            await bot.sendMessage(chatId, "Rasm jo'natishda xatolik yuz berdi");
          });
        }
      }
    } catch (err: any) {
      console.error("instagramGetUrl xato:", err);
      await bot.editMessageText("Instagram dan olinganda xatolik yuz berdi: " + (err.message || String(err)), { chat_id: chatId, message_id: loadingMsg.message_id });
    }
  });
}
