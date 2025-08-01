"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParcelZodSchema = exports.createParcelZodSchema = exports.trackingEventZodSchema = void 0;
const zod_1 = require("zod");
// Enum values for status and confirmation
const ParcelStatusEnum = zod_1.z.enum([
    "Requested",
    "Approved",
    "Dispatched",
    "In Transit",
    "Delivered",
    "Cancelled",
    "Blocked",
]);
const ReceiverConfirmationEnum = zod_1.z.enum(["Pending", "Confirmed"]);
exports.trackingEventZodSchema = zod_1.z.object({
    status: ParcelStatusEnum,
    note: zod_1.z.string().optional(),
    updatedBy: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    timestamp: zod_1.z.date().optional(),
});
const localPhoneRegex = /^01[3-9]\d{8}$/;
// Main Parcel Schema
exports.createParcelZodSchema = zod_1.z.object({
    trackingId: zod_1.z
        .string({ error: "Tracking ID is required" })
        .min(5, "Tracking ID must be at least 5 characters").optional(),
    sender: zod_1.z.string().regex(localPhoneRegex, { message: "Sender phone must be a valid 11-digit BD number (e.g., 01828518808)" }),
    receiver: zod_1.z.string().regex(localPhoneRegex, { message: "Receiver phone must be a valid 11-digit BD number" }),
    type: zod_1.z
        .string({ error: "Parcel type is required" })
        .min(2, "Type must be at least 2 characters"),
    weight: zod_1.z
        .number({ error: "Weight is required" })
        .positive("Weight must be a positive number"),
    fromAddress: zod_1.z
        .string({ error: "From address is required" })
        .min(5, "From address must be at least 5 characters"),
    toAddress: zod_1.z
        .string({ error: "To address is required" })
        .min(5, "To address must be at least 5 characters"),
    fee: zod_1.z.number().nonnegative().optional(),
    baseFee: zod_1.z.number().optional(),
    status: ParcelStatusEnum.optional(),
    isBlocked: zod_1.z.boolean().optional(),
    trackingEvents: zod_1.z.array(exports.trackingEventZodSchema).optional(),
    reciverConfiramtion: ReceiverConfirmationEnum.optional(),
});
exports.updateParcelZodSchema = zod_1.z.object({
    trackingId: zod_1.z.string().optional(),
    sender: zod_1.z.string().regex(localPhoneRegex, { message: "Sender phone must be a valid 11-digit BD number (e.g., 01828518808)" }).optional(),
    receiver: zod_1.z.string().regex(localPhoneRegex, { message: "Receiver phone must be a valid 11-digit BD number" }).optional(),
    type: zod_1.z.string().optional(),
    weight: zod_1.z.number().optional(),
    fromAddress: zod_1.z.string().optional(),
    toAddress: zod_1.z.string().optional(),
    fee: zod_1.z.number().optional(),
    status: zod_1.z.enum([
        'Requested',
        'Approved',
        'Dispatched',
        'In Transit',
        'Delivered',
        'Cancelled',
        'Blocked',
    ]).optional(),
    isBlocked: zod_1.z.boolean().optional(),
    reciverConfiramtion: zod_1.z.enum(['Pending', 'Confirmed']).optional(),
    trackingEvents: zod_1.z.array(zod_1.z.object({
        status: zod_1.z.enum([
            'Requested',
            'Approved',
            'Dispatched',
            'In Transit',
            'Delivered',
            'Cancelled',
            'Blocked',
        ]),
        note: zod_1.z.string().optional(),
        updatedBy: zod_1.z.string().optional(),
        timestamp: zod_1.z.date().optional(),
    })).optional()
});
