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
exports.deleteUsers = exports.getOneUsers = exports.getAllUsers = void 0;
const tgBot_schema_1 = __importDefault(require("../model/tgBot.schema"));
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield tgBot_schema_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getOneUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield tgBot_schema_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getOneUsers = getOneUsers;
const deleteUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield tgBot_schema_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }
        yield tgBot_schema_1.default.findByIdAndDelete(id);
        res.status(200).json({
            msg: "User deleted successfully"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUsers = deleteUsers;
