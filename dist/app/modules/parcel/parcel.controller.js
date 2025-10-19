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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelController = exports.getParcelstatusById = exports.updateStatusController = exports.updateParcel = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const parcel_service_1 = require("./parcel.service");
const sendResponse_1 = require("../../utils/sendResponse");
const parcel_model_1 = require("./parcel.model");
const createParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.user.email;
    const trackingEvents = [
        {
            status: 'Requested',
            note: 'Parcel created',
            location: req.body.fromAddress,
            timestamp: new Date(),
        },
    ];
    const parcelData = Object.assign(Object.assign({}, req.body), { createdby: email, trackingEvents: trackingEvents });
    const result = yield parcel_service_1.ParcelService.createParcel(parcelData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'Parcel created successfully',
        data: result,
    });
}));
const cancelParcle = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trackingEvents = [
        {
            status: 'Cancelled',
            note: 'Cancelled by sender',
            location: req.body.fromAddress,
            timestamp: new Date(),
        },
    ];
    const parcelData = Object.assign(Object.assign({}, req.body), { trackingEvents: trackingEvents });
    const result = yield parcel_service_1.ParcelService.cancelParcel(req.params.id, parcelData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Parcel updated successfully',
        data: result,
    });
}));
const getParcelsByEmail = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdby = req.user.email;
    const parcels = yield parcel_service_1.ParcelService.getParcelsByEmail(createdby);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Parcels fetched successfully",
        data: parcels,
    });
}));
const incomingParcels = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.user.email;
    const userdata = yield parcel_service_1.ParcelService.incomingParcels(email);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Incoming Parcels fetched successfully",
        data: userdata,
    });
}));
const confirmDelivery = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelService.confirmation(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Parcel updated successfully',
        data: result,
    });
}));
const getReceiverHistory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.user.email;
    const result = yield parcel_service_1.ParcelService.getDeliveryHistory(email);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Delivery history fetched successfully',
        data: result,
    });
}));
const getallParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield parcel_model_1.Parcel.find();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Delivery history fetched successfully',
        data: data,
    });
}));
exports.updateParcel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcelId = req.params.id;
    const result = yield parcel_service_1.ParcelService.blockParcel(parcelId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Parcel Updated successfully',
        data: result,
    });
}));
exports.updateStatusController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parcelId = req.params.id;
    const { newStatus, location, note } = req.body;
    const updatedBy = req.user.id;
    const result = yield (0, parcel_service_1.updateParcelStatus)({
        parcelId,
        newStatus,
        updatedBy,
        location,
        note,
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Parcel status updated successfully',
        data: result,
    });
}));
exports.getParcelstatusById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trackingId = req.params.trackingId;
    const parcel = yield parcel_model_1.Parcel.findOne({ trackingId: trackingId }).select('trackingEvents sender fee');
    if (!parcel) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: 404,
            message: 'Parcel not found',
            data: null,
        });
    }
    const trackingEvents = parcel === null || parcel === void 0 ? void 0 : parcel.trackingEvents.map(({ status, note, timestamp }) => ({
        status,
        note,
        timestamp,
    }));
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Tracking events fetched successfully',
        data: {
            sender: parcel.sender,
            fee: parcel.fee,
            trackingEvents,
        },
    });
}));
const createCouponController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const coupon = yield (0, parcel_service_1.createCoupon)(data);
    res.status(201).json({
        success: true,
        message: "Coupon created successfully",
        data: coupon,
    });
}));
exports.ParcelController = {
    createParcel,
    cancelParcle,
    getParcelsByEmail,
    incomingParcels,
    confirmDelivery,
    getReceiverHistory,
    getallParcel,
    updateParcel: exports.updateParcel,
    updateStatusController: exports.updateStatusController,
    getParcelstatusById: exports.getParcelstatusById,
    createCouponController
};
