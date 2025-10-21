import { User } from "../user/user.model";
import { ICoupon, IParcel } from "./parcel.interface";
import { Coupon, Parcel } from "./parcel.model";
import { Types } from 'mongoose';
import { ParcelStatus } from './parcel.interface';
import { generateTrackingId } from "../../utils/generateTracking";

const createParcel = async (payload: IParcel) => {
 

  const { weight, baseFee, ratePerKg,couponCode,  ...rest } = payload;

  const calculateFee = (weight: number, baseFee: number, ratePerKg: number): number => {
    return baseFee + weight * ratePerKg;
  };

  const feeWithoutDiscount = calculateFee(weight ?? 0, baseFee ?? 100, ratePerKg ?? 50);
 
 let discountAmount = 0;


  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      throw new Error('Invalid coupon code');
    }

    if (coupon.discountType === 'flat') {
      discountAmount = coupon.discountAmount;
    } else if (coupon.discountType === 'percent') {
      discountAmount = (feeWithoutDiscount * coupon.discountAmount) / 100;
    }

    // Optional: Prevent over-discount
    if (discountAmount > feeWithoutDiscount) {
      discountAmount = feeWithoutDiscount;
    }
    
  }

  
  const fee = feeWithoutDiscount - discountAmount;
  
  

 const trackingId=generateTrackingId();

  const parcel = await Parcel.create({
    ...rest,
    weight,
    baseFee,
    ratePerKg,
    fee,
    trackingId,
    couponCode 
    
  });
 
  return parcel;
}

const cancelParcel = async (id: string, payload: Partial<IParcel>) => {
  const existParcel = await Parcel.findById(id);
  if (!existParcel) {
    throw new Error("Parcel not found")
  }
  if ((payload.status as string) == "Dispatched"|| (payload.status as string) ==  'In Transit'||(payload.status as string) == 'Delivered') {
    throw new Error("Product Dispactch cant cancel");
  }
  const parcel = await Parcel.findByIdAndUpdate(id, payload, { new: true });
  return parcel;


}

const getParcelsByEmail = async (email: string) => {
  const parcels = await Parcel.find({ createdby: email });
  if (!parcels || parcels.length === 0) {
    throw new Error("No parcels found for this user.");
  }

  return parcels.map(parcel => ({
    trackingId: parcel.trackingId,
    id:parcel._id,
    
    receiver:parcel.receiver,
    sender: parcel.sender,
    type: parcel.type,
    createdAt:parcel.createdAt,
    weight: parcel.weight,
    fromAddress: parcel.fromAddress,
    toAddress: parcel.toAddress,
    fee: parcel.fee,
    discountAmount: parcel.discountAmount,
    status: parcel.status,
    status_logs: parcel.trackingEvents,
  }));
};

//Reciver
const incomingParcels = async (email: string) => {
  const userd = await User.findOne({ email: email });
  const phone = userd?.phone;
  const dataa = await Parcel.find({ receiver: phone }).select(
    'trackingId type sender status fromAddress toAddress createdAt trackingEvents'
  );


  return dataa;
};
const confirmation = async (id: string, payload: Partial<IParcel>) => {
  const existParcel = await Parcel.findById(id);
  if (!existParcel) {
    throw new Error("Parcel not found");
  }

  
  if (existParcel.reciverConfiramtion === "Pending") {
    const parcel = await Parcel.findByIdAndUpdate(id, payload, { new: true });
    return parcel;
  } else {
    throw new Error("Already Confirmed");
  }
};

const getDeliveryHistory = async (email: string) => {
  const user = await User.findOne({ email });
  const phone = user?.phone;


  const history = await Parcel.find({
    receiver: phone,
    status: 'Delivered',
  }).sort({ deliveredAt: -1 }); 

  return history;
};

const blockParcel = async (id: string, payload: Partial<IParcel>) => {
  const existParcel = await Parcel.findById(id);
  if (!existParcel) {
    throw new Error("Parcel not found");
  }

  const parcel = await Parcel.findByIdAndUpdate(id, payload, { new: true });
  return parcel;
};


interface UpdateParcelStatusInput {
  parcelId: string;
  newStatus: ParcelStatus;
  updatedBy: Types.ObjectId | string;
  location?:string;
  note?: string;
}

export const updateParcelStatus = async ({
  parcelId,
  newStatus,
  updatedBy,
  location = '',
  note = '',
}: UpdateParcelStatusInput) => {
  
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) {
    throw new Error('Parcel not found');
  }
  const statusFlow: string[] = [
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

  if (newIndex !== currentIndex + 1 &&  newStatus !== 'Cancelled') {
    throw new Error(
      `Status update must follow the correct order. Current: ${parcel.status}, Next allowed: ${statusFlow[currentIndex + 1]}`
    );
  }

  if (parcel.status === newStatus) {
    throw new Error('Parcel is already in that status');
  }

 
  parcel.status = newStatus;


  parcel.trackingEvents.push({
    status: newStatus,
    updatedBy: updatedBy as Types.ObjectId,
    note,
      location,
    timestamp: new Date(),
  });

 
  const updatedParcel = await parcel.save();

  return updatedParcel;
};

export interface CreateCouponInput {
  code: string;
  discountAmount: number;
  discountType: 'flat' | 'percent';
  isActive?: boolean;
  expiresAt?: Date;
}

export const createCoupon = async (data: CreateCouponInput): Promise<ICoupon> => {
  
  const existing = await Coupon.findOne({ code: data.code });
  if (existing) {
    throw new Error('Coupon code already exists');
  }

  const coupon = new Coupon({
    code: data.code,
    discountAmount: data.discountAmount,
    discountType: data.discountType,
    isActive: data.isActive ?? true,
    expiresAt: data.expiresAt,
  });

  return coupon.save();
};

export const ParcelService = {
  createParcel,
  cancelParcel,
  getParcelsByEmail,
  incomingParcels,
  confirmation,
  getDeliveryHistory,
  blockParcel,
  updateParcelStatus,
  createCoupon
}