import { Types } from 'mongoose';

export type ParcelStatus =
  | 'Requested'
  | 'Approved'
  | 'Dispatched'
  | 'In Transit'
  | 'Delivered'
  | 'Cancelled'
  | 'Blocked';

export interface ITrackingEvent {
  status: ParcelStatus;
  note?: string;
  updatedBy?: Types.ObjectId;
  location?:string;
  timestamp?: Date;
}
export interface IParcel {
  trackingId?: string;
  createdby?:string
  sender: string,
  receiver:string;
  type: string;
  weight: number;
  fromAddress: string;
  toAddress: string;
    fee?: number;
  baseFee: number;
  ratePerKg?: number;
  discountAmount?: number;
  couponCode?: string;
  status: ParcelStatus;
  isBlocked?: boolean;
  trackingEvents: ITrackingEvent[];
  createdAt?: Date;
  updatedAt?: Date;
  reciverConfiramtion?:string
}
import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon  {
  code: string;
  discountAmount: number; // flat discount amount OR percentage
  isActive: boolean;
  expiresAt?: Date;
  discountType: 'flat' | 'percent'; // type of discount
}

