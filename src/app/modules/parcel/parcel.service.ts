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




export const ParcelService={
    createParcel,
    cancelParcel,
    getParcelsByEmail,
    incomingParcels
}