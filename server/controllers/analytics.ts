import {Request,Response,NextFunction} from 'express';
import { catchAsyncError } from '../middlewares/catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import { generateLast12MonthsData } from '../utils/analytics';
import userModel from '../models/User';
import CourseModel from '../models/Course_model';
import orderModel from '../models/Order-Model';
//get user analytics
export const getUserAnalytics =catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const users=await generateLast12MonthsData(userModel);
        res.status(200).json({
            success:true,
            users,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})

export const getCourseAnalytics =catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const users=await generateLast12MonthsData(CourseModel);
        res.status(200).json({
            success:true,
            users,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})


export const getOrderAnalytics =catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const users=await generateLast12MonthsData(orderModel);
        res.status(200).json({
            success:true,
            users,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500))
    }
})
