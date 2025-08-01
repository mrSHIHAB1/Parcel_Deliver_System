"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = exports.Parcel = void 0;
const mongoose_1 = require("mongoose");
const trackingEventSchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: ['Requested', 'Approved', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled', 'Blocked'],
        required: true
    },
    note: {
        type: String,
        default: ''
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    location: {
        type: String,
        default: '',
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
const parcelSchema = new mongoose_1.Schema({
    trackingId: {
        type: String,
        unique: true
    }, createdby: {
        type: String
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    fromAddress: {
        type: String,
        required: true
    },
    toAddress: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        default: 0
    },
    baseFee: {
        type: Number,
        required: true
    },
    ratePerKg: {
        type: Number,
        default: 50,
    },
    discountAmount: {
        type: Number,
        default: 0,
    },
    couponCode: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['Requested', 'Approved', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled', 'Blocked'],
        default: 'Requested'
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    trackingEvents: [trackingEventSchema],
    reciverConfiramtion: {
        type: String,
        enum: ['Pending', 'Confirmed'],
        default: 'Pending'
    }
}, {
    timestamps: true
});
exports.Parcel = (0, mongoose_1.model)("Parcel", parcelSchema);
const couponSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true },
    discountAmount: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date },
    discountType: { type: String, enum: ['flat', 'percent'], default: 'flat' },
});
exports.Coupon = (0, mongoose_1.model)('Coupon', couponSchema);
