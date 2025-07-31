import mongoose, { Schema, Document,  model } from 'mongoose';
import { IParcel } from './parcel.interface';


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
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const parcelSchema = new Schema<ParcelDocument>({
  trackingId: {
    type: String,
    required: true,
    unique: true
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
