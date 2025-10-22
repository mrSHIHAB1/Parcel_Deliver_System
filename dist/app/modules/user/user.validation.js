"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
const localPhoneRegex = /^01[3-9]\d{8}$/;
exports.createUserZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ error: "Name is required" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    email: zod_1.z
        .string({ error: "Email is required" })
        .email({ message: "Invalid email format" })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: zod_1.z
        .string({ error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
        .regex(/(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    }),
    phone: zod_1.z.string().regex(localPhoneRegex, { message: "Sender phone must be a valid 11-digit BD number (e.g., 01828518808)" }),
    role: zod_1.z.enum(["ADMIN", "SENDER", "USER", "RECIVER"]),
    address: zod_1.z
        .string()
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
    isVerified: zod_1.z.boolean().optional(),
    sendinfo: zod_1.z.array(zod_1.z.string()).optional(),
    reciveinfo: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.updateZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ error: "Name is required" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }).optional(),
    email: zod_1.z
        .string({ error: "Email is required" })
        .email({ message: "Invalid email format" })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }).optional(),
    password: zod_1.z
        .string({ error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
        .regex(/(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    }).optional(),
    phone: zod_1.z
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    address: zod_1.z
        .string()
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
    isVerified: zod_1.z.boolean().optional(),
    isblocked: zod_1.z.boolean().optional(),
    sendinfo: zod_1.z.array(zod_1.z.string()).optional(),
    reciveinfo: zod_1.z.array(zod_1.z.string()).optional(),
});
