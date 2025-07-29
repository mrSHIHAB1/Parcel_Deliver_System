import { Request, response, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ParcelService } from "./parcel.service";
import { sendResponse } from "../../utils/sendResponse";
import { request } from "http";



const createParcel=catchAsync(async(req:Request,res:Response)=>{
   const email = (req.user as { email: string }).email;
 
   const parcelData = {
      ...req.body,
      sender: email,
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
  const email = (req.user as { email: string }).email;

  const parcels = await ParcelService.getParcelsByEmail(email);

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

export const ParcelController={
    createParcel,
    cancelParcle,
    getParcelsByEmail,
    incomingParcels,
    confirmDelivery,
    getReceiverHistory
}