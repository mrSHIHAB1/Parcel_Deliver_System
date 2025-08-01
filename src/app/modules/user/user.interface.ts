import { Types } from "mongoose";

export enum Role{
   ADMIN="ADMIN",
   SENDER="SENDER",
    USER = "USER",
   RECIVER="RECIVER"
}


export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser {
    _id?: Types.ObjectId
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: string;
    isActive?: IsActive;
    isVerified?: boolean;
    isblocked?:boolean;
    role: Role;
    sendinfo?: Types.ObjectId[]
    reciveinfo?: Types.ObjectId[]
}