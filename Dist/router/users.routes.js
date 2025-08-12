"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_ctr_1 = require("../controller/user.ctr");
const usersRouter = (0, express_1.Router)();
usersRouter.get("/get_all_users", user_ctr_1.getAllUsers);
usersRouter.get("/get_one_user/:id", user_ctr_1.getOneUsers);
usersRouter.delete("/delete_user/:id", user_ctr_1.deleteUsers);
exports.default = usersRouter;
