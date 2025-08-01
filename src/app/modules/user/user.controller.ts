import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";



const createUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user= await UserServices.createUser(req.body);
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"User Created Successfully",
        data:user
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})
const Updatuser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 const { id } = req.params; 
  const result = await UserServices. updateUser(id, req.body);
sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"Updated user Successfully",
        data:result
    })
})
export const UserControllers={
        getAllUsers,
    createUser,
    Updatuser 
}