import { catchAsyncError } from "../middlewares/catchAsyncError";
import notificationModel from "../models/Notification-model";
import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction,Request,Response } from "express";
import cron from 'node-cron'
export const getNotification=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const notification=await notificationModel.find().sort({createdAt:-1});
        res.status(201).json({
            success:true,
            notification,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500));
    }
})
//update notification
export const updateNotification=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const notification=await notificationModel.findById(req.params.id); 
        if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification?.status;
      }

      await notification.save();

      const notifications = await notificationModel.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error:any) {
        return next(new ErrorHandler(error.message,500));
    }
})
//delete notification auto after 1 moth?
//using cron

cron.schedule("0 0 0 * * *", async() => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await notificationModel.deleteMany({status:"read",createdAt: {$lt: thirtyDaysAgo}});
  console.log('Deleted read notifications');
});

