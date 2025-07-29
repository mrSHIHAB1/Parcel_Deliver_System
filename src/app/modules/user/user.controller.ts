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

    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})

export const UserControllers={
        getAllUsers,
    createUser
}