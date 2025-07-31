
import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ParcelController } from "./parcel.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createParcelZodSchema, updateParcelZodSchema } from "./parcel.validation";


const router=Router();

router.post('/createParcel',validateRequest(createParcelZodSchema),checkAuth(Role.SENDER,Role.ADMIN),ParcelController.createParcel)
router.patch('/cancelParcel/:id',validateRequest(updateParcelZodSchema),checkAuth(Role.SENDER,Role.ADMIN),ParcelController.cancelParcle)
router.get("/getParcel",checkAuth(Role.SENDER),ParcelController.getParcelsByEmail)
router.get("/reciverParcels",checkAuth(Role.RECIVER),ParcelController.incomingParcels)
router.patch("/reciverConfirm/:id",checkAuth(Role.RECIVER),ParcelController.confirmDelivery)
router.get("/getreciverhistory",checkAuth(Role.RECIVER),ParcelController.getReceiverHistory)
router.get("/allparcel",checkAuth(Role.ADMIN),ParcelController.getallParcel)
router.patch("/blockParcel",checkAuth(Role.ADMIN),ParcelController.blockParcel)
// routes/parcel.routes.ts
router.patch('/update-status/:id',checkAuth(Role.ADMIN), ParcelController.updateStatusController);
router.get('/tracking-events/:id',checkAuth(Role.ADMIN), ParcelController.getParcelstatusById)

export const ParcelRoutes=router;