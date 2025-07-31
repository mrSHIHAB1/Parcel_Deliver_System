import { z } from "zod";

// Enum values for status and confirmation
const ParcelStatusEnum = z.enum([
  "Requested",
  "Approved",
  "Dispatched",
  "In Transit",
  "Delivered",
  "Cancelled",
  "Blocked",
]);

const ReceiverConfirmationEnum = z.enum(["Pending", "Confirmed"]);

// Tracking Event Schema
export const trackingEventZodSchema = z.object({
  status: ParcelStatusEnum,
  note: z.string().optional(),
  updatedBy: z.string().optional(), // Assuming ObjectId as string
  timestamp: z.date().optional(),
});

// Main Parcel Schema
export const createParcelZodSchema = z.object({
  trackingId: z
    .string({ error: "Tracking ID is required" })
    .min(5, "Tracking ID must be at least 5 characters"),
  
  sender: z
    .string({ error: "Sender is required" })
    .min(3, "Sender name must be at least 3 characters").optional(),

  receiver: z
    .string({ error: "Receiver is required" })
    .min(3, "Receiver name must be at least 3 characters"),

  type: z
    .string({ error: "Parcel type is required" })
    .min(2, "Type must be at least 2 characters"),

  weight: z
    .number({ error: "Weight is required" })
    .positive("Weight must be a positive number"),

  fromAddress: z
    .string({ error: "From address is required" })
    .min(5, "From address must be at least 5 characters"),

  toAddress: z
    .string({ error: "To address is required" })
    .min(5, "To address must be at least 5 characters"),

  fee: z.number().nonnegative().optional(),

  status: ParcelStatusEnum.optional(),

  isBlocked: z.boolean().optional(),

  trackingEvents: z.array(trackingEventZodSchema).optional(),

  reciverConfiramtion: ReceiverConfirmationEnum.optional(),
});


export const updateParcelZodSchema = z.object({
  trackingId: z.string().optional(),
  sender: z.string().optional(),
  receiver: z.string().optional(),
  type: z.string().optional(),
  weight: z.number().optional(),
  fromAddress: z.string().optional(),
  toAddress: z.string().optional(),
  fee: z.number().optional(),
  status: z.enum([
    'Requested',
    'Approved',
    'Dispatched',
    'In Transit',
    'Delivered',
    'Cancelled',
    'Blocked',
  ]).optional(),
  isBlocked: z.boolean().optional(),
  reciverConfiramtion: z.enum(['Pending', 'Confirmed']).optional(),
  trackingEvents: z.array(z.object({
    status: z.enum([
      'Requested',
      'Approved',
      'Dispatched',
      'In Transit',
      'Delivered',
      'Cancelled',
      'Blocked',
    ]),
    note: z.string().optional(),
    updatedBy: z.string().optional(), // assuming ObjectId is string
    timestamp: z.date().optional(),
  })).optional()
});
