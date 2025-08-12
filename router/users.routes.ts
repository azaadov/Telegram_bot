import { RequestHandler, Router } from "express";
import { deleteUsers, getAllUsers, getOneUsers } from "../controller/user.ctr";

const usersRouter: Router = Router()


usersRouter.get("/get_all_users", getAllUsers as RequestHandler)
usersRouter.get("/get_one_user/:id", getOneUsers as RequestHandler)
usersRouter.delete("/delete_user/:id", deleteUsers as RequestHandler)

export default usersRouter;