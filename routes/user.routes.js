import { Router } from "express";
import { AddUser, DeleteUser, EditUser, EditUserPermission, EditUserRole, GetAllUsers, GetUserById, uploadImage } from "../controller/user.controller.js";

const userRouter = new Router();

userRouter.get("/",GetAllUsers)
userRouter.get("/:id",GetUserById);
userRouter.post("/",AddUser);
userRouter.put("/:id",EditUser);
userRouter.put("/permission/:id",EditUserPermission);
userRouter.put("/role/:id",EditUserRole);
userRouter.delete("/:id",DeleteUser)
userRouter.post("/upload",uploadImage)

export default userRouter;