import express, { Request, Response } from 'express'
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();



app.use(cookieParser())
app.use(express.json())
app.use(cors())


app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        message:"Welcome to the Parcel Delivery System"
    })
})

export default app;