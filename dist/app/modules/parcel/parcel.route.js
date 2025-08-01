"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const parcel_controller_1 = require("./parcel.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const parcel_validation_1 = require("./parcel.validation");
const router = (0, express_1.Router)();
//sender
router.post('/createParcel', (0, validateRequest_1.validateRequest)(parcel_validation_1.createParcelZodSchema), (0, checkAuth_1.checkAuth)(user_interface_1.Role.SENDER, user_interface_1.Role.ADMIN), parcel_controller_1.ParcelController.createParcel);
router.patch('/cancelParcel/:id', (0, validateRequest_1.validateRequest)(parcel_validation_1.updateParcelZodSchema), (0, checkAuth_1.checkAuth)(user_interface_1.Role.SENDER, user_interface_1.Role.ADMIN), parcel_controller_1.ParcelController.cancelParcle);
router.get("/getParcel", (0, checkAuth_1.checkAuth)(user_interface_1.Role.SENDER), parcel_controller_1.ParcelController.getParcelsByEmail);
//reciver
router.get("/reciverParcels", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RECIVER), parcel_controller_1.ParcelController.incomingParcels);
router.patch("/reciverConfirm/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RECIVER), parcel_controller_1.ParcelController.confirmDelivery);
router.get("/getreciverhistory", (0, checkAuth_1.checkAuth)(user_interface_1.Role.RECIVER), parcel_controller_1.ParcelController.getReceiverHistory);
//ADMIN
router.get("/allparcel", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), parcel_controller_1.ParcelController.getallParcel);
router.post("/blockParcel/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), parcel_controller_1.ParcelController.blockParcel);
router.patch('/update-status/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), parcel_controller_1.ParcelController.updateStatusController);
router.post('/createCoupon', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SENDER), parcel_controller_1.ParcelController.createCouponController);
//Public
router.get('/tracking-events/:trackingId', parcel_controller_1.ParcelController.getParcelstatusById);
exports.ParcelRoutes = router;
