
import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ParcelController } from "./parcel.controller";
import { ParcelService } from "./parcel.service";

const router=Router();

router.post('/createParcel',checkAuth(Role.SENDER),ParcelController.createParcel)
router.patch('/cancelParcel/:id',checkAuth(Role.SENDER),ParcelController.cancelParcle)
router.get("/getParcel",checkAuth(Role.SENDER),ParcelController.getParcelsByEmail)
router.get("/reciverParcels",checkAuth(Role.RECIVER),ParcelController.incomingParcels)

export const ParcelRoutes=router;