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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelService = exports.createCoupon = exports.updateParcelStatus = void 0;
const user_model_1 = require("../user/user.model");
const parcel_model_1 = require("./parcel.model");
const createParcel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { weight, baseFee, ratePerKg, couponCode } = payload, rest = __rest(payload, ["weight", "baseFee", "ratePerKg", "couponCode"]);
    const calculateFee = (weight, baseFee, ratePerKg) => {
        return baseFee + weight * ratePerKg;
    };
    const feeWithoutDiscount = calculateFee(weight !== null && weight !== void 0 ? weight : 0, baseFee !== null && baseFee !== void 0 ? baseFee : 100, ratePerKg !== null && ratePerKg !== void 0 ? ratePerKg : 50);
    let discountAmount = 0;
    if (couponCode) {
        const coupon = yield parcel_model_1.Coupon.findOne({ code: couponCode });
        if (!coupon) {
            throw new Error('Invalid coupon code');
        }
        if (coupon.discountType === 'flat') {
            discountAmount = coupon.discountAmount;
        }
        else if (coupon.discountType === 'percent') {
            discountAmount = (feeWithoutDiscount * coupon.discountAmount) / 100;
        }
        // Optional: Prevent over-discount
        if (discountAmount > feeWithoutDiscount) {
            discountAmount = feeWithoutDiscount;
        }
    }
    const fee = feeWithoutDiscount - discountAmount;
    const trackingId = (0, generateTracking_1.generateTrackingId)();
    const parcel = yield parcel_model_1.Parcel.create(Object.assign(Object.assign({}, rest), { weight,
        baseFee,
        ratePerKg,
        fee,
        trackingId,
        couponCode }));
    return parcel;
});
const cancelParcel = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existParcel = yield parcel_model_1.Parcel.findById(id);
    if (!existParcel) {
        throw new Error("Parcel not found");
    }
    if (payload.status == "Dispatched" || payload.status == 'In Transit' || payload.status == 'Delivered') {
        throw new Error("Product Dispactch cant cancel");
    }
    const parcel = yield parcel_model_1.Parcel.findByIdAndUpdate(id, payload, { new: true });
    return parcel;
});
const getParcelsByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find({ createdby: email });
    if (!parcels || parcels.length === 0) {
        throw new Error("No parcels found for this user.");
    }
    return parcels.map(parcel => ({
        trackingId: parcel.trackingId,
        sender: parcel.sender,
        type: parcel.type,
        weight: parcel.weight,
        fromAddress: parcel.fromAddress,
        toAddress: parcel.toAddress,
        fee: parcel.fee,
        discountAmount: parcel.discountAmount,
        status: parcel.status,
        status_logs: parcel.trackingEvents,
    }));
});
//Reciver
const incomingParcels = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userd = yield user_model_1.User.findOne({ email: email });
    const phone = userd === null || userd === void 0 ? void 0 : userd.phone;
    const dataa = yield parcel_model_1.Parcel.find({ receiver: phone }).select('trackingId sender status fromAddress toAddress createdAt');
    return dataa;
});
const confirmation = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existParcel = yield parcel_model_1.Parcel.findById(id);
    if (!existParcel) {
        throw new Error("Parcel not found");
    }
    if (existParcel.reciverConfiramtion === "Pending") {
        const parcel = yield parcel_model_1.Parcel.findByIdAndUpdate(id, payload, { new: true });
        return parcel;
    }
    else {
        throw new Error("Already Confirmed");
    }
});
const getDeliveryHistory = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    const phone = user === null || user === void 0 ? void 0 : user.phone;
    const history = yield parcel_model_1.Parcel.find({
        receiver: phone,
        status: 'Delivered',
    }).sort({ deliveredAt: -1 });
    return history;
});
const blockParcel = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existParcel = yield parcel_model_1.Parcel.findById(id);
    if (!existParcel) {
        throw new Error("Parcel not found");
    }
    const parcel = yield parcel_model_1.Parcel.findByIdAndUpdate(id, payload, { new: true });
    return parcel;
});
const generateTracking_1 = require("../../utils/generateTracking");
const updateParcelStatus = (_a) => __awaiter(void 0, [_a], void 0, function* ({ parcelId, newStatus, updatedBy, location = '', note = '', }) {
    const parcel = yield parcel_model_1.Parcel.findById(parcelId);
    if (!parcel) {
        throw new Error('Parcel not found');
    }
    const statusFlow = [
        'Approved',
        'Dispatched',
        'In Transit',
        'Delivered',
        'Cancelled'
    ];
    const currentIndex = statusFlow.indexOf(parcel.status);
    const newIndex = statusFlow.indexOf(newStatus);
    if (newIndex === -1) {
        throw new Error('Invalid status');
    }
    if (newIndex !== currentIndex + 1 && newStatus !== 'Cancelled') {
        throw new Error(`Status update must follow the correct order. Current: ${parcel.status}, Next allowed: ${statusFlow[currentIndex + 1]}`);
    }
    if (parcel.status === newStatus) {
        throw new Error('Parcel is already in that status');
    }
    parcel.status = newStatus;
    parcel.trackingEvents.push({
        status: newStatus,
        updatedBy: updatedBy,
        note,
        location,
        timestamp: new Date(),
    });
    const updatedParcel = yield parcel.save();
    return updatedParcel;
});
exports.updateParcelStatus = updateParcelStatus;
const createCoupon = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existing = yield parcel_model_1.Coupon.findOne({ code: data.code });
    if (existing) {
        throw new Error('Coupon code already exists');
    }
    const coupon = new parcel_model_1.Coupon({
        code: data.code,
        discountAmount: data.discountAmount,
        discountType: data.discountType,
        isActive: (_a = data.isActive) !== null && _a !== void 0 ? _a : true,
        expiresAt: data.expiresAt,
    });
    return coupon.save();
});
exports.createCoupon = createCoupon;
exports.ParcelService = {
    createParcel,
    cancelParcel,
    getParcelsByEmail,
    incomingParcels,
    confirmation,
    getDeliveryHistory,
    blockParcel,
    updateParcelStatus: exports.updateParcelStatus,
    createCoupon: exports.createCoupon
};
