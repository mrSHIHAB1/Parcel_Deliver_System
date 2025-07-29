import express, { Request, Response } from 'express'
import cookieParser from "cookie-parser";
import cors from "cors";
import expressSession from "express-session";
import { router } from './app/routes';
import "./app/config/passport";
import passport from 'passport';
import { envVars } from './app/config/env';
const app=express();

app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use("/api/v1",router)
app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        message:"Welcome to the Parcel Delivery System"
    })
})

export default app;