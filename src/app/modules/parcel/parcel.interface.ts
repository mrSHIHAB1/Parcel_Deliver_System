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
  updatedBy: Types.ObjectId;
  timestamp?: Date;
}

export interface IParcel {
  trackingId: string;
  sender: string,
  receiver:string;
  type: string;
  weight: number;
  fromAddress: string;
  toAddress: string;
  fee?: number;
  status: ParcelStatus;
  isBlocked?: boolean;
  trackingEvents: ITrackingEvent[];
  createdAt?: Date;
  updatedAt?: Date;
  reciverConfiramtion?:string
}
