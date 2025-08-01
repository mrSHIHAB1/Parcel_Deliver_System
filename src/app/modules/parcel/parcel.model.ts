import mongoose, { Schema, Document,  model } from 'mongoose';
import { ICoupon, IParcel } from './parcel.interface';


export interface ParcelDocument extends IParcel, Document {}

const trackingEventSchema = new Schema({
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
    type: Schema.Types.ObjectId,
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

const parcelSchema = new Schema<ParcelDocument>({
  trackingId: {
    type: String,
    unique: true
  },createdby:{
    type:String
  },
  sender: {
    type:String,
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
  required:true
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
  reciverConfiramtion:{
    type:String,
    enum:['Pending','Confirmed'],
    default:'Pending'
  }
}, {
  timestamps: true
});


export const Parcel=model<ParcelDocument>("Parcel",parcelSchema);

const couponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true },
  discountAmount: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  expiresAt: { type: Date },
  discountType: { type: String, enum: ['flat', 'percent'], default: 'flat' },
});

export const Coupon = model<ICoupon>('Coupon', couponSchema);
