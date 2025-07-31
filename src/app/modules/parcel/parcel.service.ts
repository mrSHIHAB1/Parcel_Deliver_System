import { User } from "../user/user.model";
import { IParcel } from "./parcel.interface";
import { Parcel } from "./parcel.model";

const createParcel=async(payload:IParcel)=>{

const parcel = await Parcel.create(payload)
return parcel;
}

const cancelParcel=async(id:string,payload:Partial<IParcel>)=>{
    const existParcel=await Parcel.findById(id);
    if(!existParcel){
        throw new Error("Parcel not found")
    }
      if ((payload.status as string) == "Dispatched") {
    throw new Error("Product Dispactch cant cancel");
  }
    const parcel =await Parcel.findByIdAndUpdate(id,payload,{new:true});
    return parcel;


}

const getParcelsByEmail = async (email: string) => {
  const parcels = await Parcel.find({ sender: email });
  return parcels;
};
const incomingParcels = async (email: string) => {
  const userd = await User.findOne({ email: email });
  const phone = userd?.phone;
  const dataa=await Parcel.find({receiver:phone}).select(
    'trackingId sender status fromAddress toAddress createdAt'
  );


  return dataa;
};
const confirmation = async (id: string, payload: Partial<IParcel>) => {
  const existParcel = await Parcel.findById(id);
  if (!existParcel) {
    throw new Error("Parcel not found");
  }

  // ✅ Check the current value from the DB, not from the payload
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

  // Fetch only delivered parcels for this receiver
  const history = await Parcel.find({
    receiver: phone,
    status: 'Delivered',
  }).sort({ deliveredAt: -1 }); // recent first

  return history;
};

const blockParcel= async (id: string, payload: Partial<IParcel>) => {
  const existParcel = await Parcel.findById(id);
  if (!existParcel) {
    throw new Error("Parcel not found");
  }


    const parcel = await Parcel.findByIdAndUpdate(id, payload, { new: true });
    return parcel;
  
};
import { Types } from 'mongoose';
import { ParcelStatus } from './parcel.interface';

interface UpdateParcelStatusInput {
  parcelId: string;
  newStatus: ParcelStatus;
  updatedBy: Types.ObjectId | string;
  note?: string;
}

export const updateParcelStatus = async ({
  parcelId,
  newStatus,
  updatedBy,
  note = '',
}: UpdateParcelStatusInput) => {
  const parcel = await Parcel.findById(parcelId);
  if (!parcel) {
    throw new Error('Parcel not found');
  }

  if (parcel.status === newStatus) {
    throw new Error('Parcel is already in that status');
  }

  // Update status
  parcel.status = newStatus;

  // Add a new tracking event
  parcel.trackingEvents.push({
    status: newStatus,
    updatedBy: updatedBy as Types.ObjectId,
    note,
    timestamp: new Date(),
  });

  // Save parcel with new status and tracking event
  const updatedParcel = await parcel.save();

  return updatedParcel;
};


export const ParcelService={
    createParcel,
    cancelParcel,
    getParcelsByEmail,
    incomingParcels,
    confirmation,
    getDeliveryHistory,
    blockParcel,
    updateParcelStatus
}