import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";

const createUser=async(payload:Partial<IUser>)=>{
    const {email,password, ...rest}=payload;

    const isUserExist=await User.findOne({email});
    if(isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,"User already Exist")
    }


    const hashedPassword=await bcryptjs.hash(password as string,Number(envVars.BCRYPT_SALT_ROUND))
    const user =await User.create({
        email,
        password:hashedPassword,
        ...rest
    })

}


const getAllUsers = async () => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUsers
        }
    }
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  const updatedUserr = await User.findByIdAndUpdate(id, payload, { new: true });


  if (!updatedUserr) {
    throw new Error('User not found');
  }

return updatedUserr
};

export const UserServices={
     getAllUsers,
    createUser,
      updateUser 
}