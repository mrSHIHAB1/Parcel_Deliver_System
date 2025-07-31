import { Request, response, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { createCoupon, ParcelService, updateParcelStatus } from "./parcel.service";
import { sendResponse } from "../../utils/sendResponse";
import { Coupon, Parcel } from "./parcel.model";
import { ICoupon } from "./parcel.interface";



const createParcel=catchAsync(async(req:Request,res:Response)=>{
   const email = (req.user as { email: string }).email;

console.log("Payload:",req.body);

 const trackingEvents = [
  {
    status: 'Requested',
    note: 'Parcel created',
    timestamp: new Date(), 
  },
];

   const parcelData = {
      ...req.body,
      createdby: email,
      trackingEvents:trackingEvents
    };

    const result = await ParcelService.createParcel(parcelData);
sendResponse(res,{
        statusCode: 201,
        success: true,
        message: 'Tour created successfully',
        data: result,
})

});

const cancelParcle=catchAsync(async(req:Request,res:Response)=>{
    
    const result= await ParcelService.cancelParcel(req.params.id, req.body)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Parcel updated successfully',
        data: result,
    });
});


const getParcelsByEmail = catchAsync(async (req: Request, res: Response) => {
  const createdby = (req.user as { email: string }).email;

  const parcels = await ParcelService.getParcelsByEmail(createdby);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Parcels fetched successfully",
    data: parcels,
  });
});

const incomingParcels= catchAsync(async (req: Request, res: Response) => {
const email = (req.user as { email: string }).email;
  const userdata = await ParcelService.incomingParcels(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Incoming Parcels fetched successfully",
    data: userdata,
  });


});

const confirmDelivery=catchAsync(async(req:Request,res:Response)=>{
    
    const result= await ParcelService.confirmation(req.params.id, req.body)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Parcel updated successfully',
        data: result,
    });
});
const getReceiverHistory = catchAsync(async (req: Request, res: Response) => {
  const email = (req.user as { email: string }).email;
  const result = await ParcelService.getDeliveryHistory(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delivery history fetched successfully',
    data: result,
  });
});

const getallParcel=catchAsync(async(req:Request,res:Response)=>{
  const data=await Parcel.find();
   sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delivery history fetched successfully',
    data: data,
  });
})
const blockParcel=catchAsync(async(req:Request,res:Response)=>{
    
    const result= await ParcelService.confirmation(req.params.id, req.body)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Parcel updated successfully',
        data: result,
    });
});




// controllers/parcel.controller.ts
// controllers/parcel.controller.ts
export const updateStatusController = catchAsync(async (req: Request, res: Response) => {
  const parcelId = req.params.id;
  const { newStatus, location,note } = req.body;
  const updatedBy = (req.user as { id: string }).id; // must be set in auth middleware
console.log(location)
  const result = await updateParcelStatus({
    parcelId,
    newStatus,
    updatedBy,
    location,
    note,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Parcel status updated successfully',
    data: result,
  });
});
export const getParcelstatusById = catchAsync(async (req: Request, res: Response) => {
  const parcelId = req.params.id;
 
  const parcel = await Parcel.findById(parcelId).select('trackingEvents');

const trackingEvents = parcel?.trackingEvents.map(({ status, note, timestamp }) => ({
    status,
    note,
    timestamp,
  }));

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Tracking events fetched successfully',
    data: trackingEvents,
  });

 
});


interface CreateCouponInput {
  code: string;
  discountAmount: number;
  discountType: 'flat' | 'percent';
  isActive?: boolean;
  expiresAt?: Date;
}


const createCouponController = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const coupon = await createCoupon(data);
  res.status(201).json({
    success: true,
    message: "Coupon created successfully",
    data: coupon,
  });
});
export const ParcelController={
    createParcel,
    cancelParcle,
    getParcelsByEmail,
    incomingParcels,
    confirmDelivery,
    getReceiverHistory,
    getallParcel,
    blockParcel,
    
    updateStatusController,
    getParcelstatusById,
    createCouponController
}
