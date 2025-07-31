import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router =Router();

router.post("/register",UserControllers.createUser)
router.get("/all-users",checkAuth(Role.ADMIN), UserControllers.getAllUsers)
router.patch("/updateUsers/:id",checkAuth(Role.ADMIN),UserControllers.Updatuser)
export const UserRoutes=router;