"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTelegramBot = startTelegramBot;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const instagram_url_direct_1 = require("instagram-url-direct");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bot = new node_telegram_bot_api_1.default(process.env.BOT_TOKEN, { polling: true });
function startTelegramBot() {
    bot.setMyCommands([
        { command: "start", description: "Botni ishga tushirish" },
    ]);
    const botUsername = process.env.BOT_USERNAME;
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, `Assalomu alaykum! 👋\n` +
            `Menga link yuboring, men sizga video topib beraman.\n` +
            `Iltimos, quyidagilardan birini yuboring:\n` +
            `- To‘liq post havolasi\n` +
            `- Reel havolasi\n` +
            `- Story havolasi\n`);
    });
    bot.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        if (msg.text && msg.text.startsWith("/start"))
            return;
        const chatId = msg.chat.id;
        const url = (_a = msg.text) === null || _a === void 0 ? void 0 : _a.trim();
        if (!url)
            return bot.sendMessage(chatId, "Iltimos, Instagram link yuboring.");
        if (!/https?:\/\/(www\.)?instagram\.com\/.+/i.test(url)) {
            return bot.sendMessage(chatId, "Bu Instagram havolasi emas. To‘liq post/reel havolasini yuboring.");
        }
        const loadingMsg = yield bot.sendMessage(chatId, "Yuklanmoqda... ⏳ Iltimos, biroz kuting.");
        try {
            const data = yield (0, instagram_url_direct_1.instagramGetUrl)(url);
            console.log("instagramGetUrl natija:", data);
            if ((_b = data.post_info) === null || _b === void 0 ? void 0 : _b.is_private) {
                yield bot.editMessageText("Ushbu akkaunt private — media olinmaydi.", { chat_id: chatId, message_id: loadingMsg.message_id });
                return;
            }
            if (!data.url_list || data.url_list.length === 0) {
                yield bot.editMessageText("Media topilmadi yoki bu post qo‘llab-quvvatlanmaydi.", { chat_id: chatId, message_id: loadingMsg.message_id });
                return;
            }
            yield bot.deleteMessage(chatId, loadingMsg.message_id);
            for (const mediaUrl of data.url_list) {
                if (/\.(mp4|mov)(\?|$)/i.test(mediaUrl) || /video/.test((_d = (_c = data.media_details) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.type)) {
                    yield bot.sendVideo(chatId, mediaUrl, {
                        caption: `❤️${botUsername} orqali yuklab olindi🚀 📥`
                    }).catch((err) => __awaiter(this, void 0, void 0, function* () {
                        console.error("sendVideo xato:", err);
                        yield bot.sendMessage(chatId, "Video jo'natishda xatolik yuz berdi");
                    }));
                }
                else {
                    yield bot.sendPhoto(chatId, mediaUrl).catch((err) => __awaiter(this, void 0, void 0, function* () {
                        console.error("sendPhoto xato:", err);
                        yield bot.sendMessage(chatId, "Rasm jo'natishda xatolik yuz berdi");
                    }));
                }
            }
        }
        catch (err) {
            console.error("instagramGetUrl xato:", err);
            yield bot.editMessageText("Instagram dan olinganda xatolik yuz berdi: " + (err.message || String(err)), { chat_id: chatId, message_id: loadingMsg.message_id });
        }
    }));
}
