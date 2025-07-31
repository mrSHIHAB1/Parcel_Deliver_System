import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateZodSchema } from "./user.validation";

const router =Router();

router.post("/register",validateRequest(createUserZodSchema), UserControllers.createUser)
router.get("/all-users",checkAuth(Role.ADMIN), UserControllers.getAllUsers)
router.patch("/updateUsers/:id",validateRequest(updateZodSchema),checkAuth(Role.ADMIN),UserControllers.Updatuser)
export const UserRoutes=router;