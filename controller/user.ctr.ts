import { Request, Response, NextFunction } from "express";
import TelegramBot from "../model/tgBot.schema";


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await TelegramBot.find()
        res.status(200).json(users);
    } catch (error: any) {
        next(error)
    }
};

export const getOneUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await TelegramBot.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


export const deleteUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await TelegramBot.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }
        await TelegramBot.findByIdAndDelete(id);
        res.status(200).json({
            msg: "User deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

