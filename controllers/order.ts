import { NextFunction,Request,Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import orderModel from "../models/Order-Model";
import ErrorHandler from "../utils/ErrorHandler";
import { IOrder } from "../models/Order-Model";
import userModel from "../models/User";
import CourseModel from "../models/Course_model";
import path from 'path'
import ejs from 'ejs'
import sendMail from "../utils/sendMail";
import notificationModel from "../models/Notification-model";
import { getAllOrdersService, newOrder } from "../services/order";


//create Order
export const createOrder=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {courseId,payment_info}=req.body as IOrder;
        const user=await userModel.findById(req.user?._id);
        const courseExistsInUser=user?.courses.some((course:any)=>course._id.toString()===courseId);
        if(courseExistsInUser){
            return next(new ErrorHandler("Already enrolled in this course!",400));
        }
        const course=await CourseModel.findById(courseId);
        if(!course){
            return next(new ErrorHandler("Course not found!",400));
        }
        const data:any={
            courseId:course._id,
            userId:user?._id,
        }
        
        const mailData={
            order:{
                _id:courseId.slice(0,6),
                name:course.name,
                price:course.price,
                date:new Date().toLocaleDateString('en-US',{year:"numeric",month:"long",day:"numeric"})
            }
        }
        const html=await ejs.renderFile(path.join(__dirname,'../mails/order-confirmation.ejs'),{order:mailData})
        try {
            if(user){
                await sendMail({
                    email:user.email,
                    subject:"order confirmation",
                    template:"order-confirmation.ejs",
                    data:mailData,
                });
            }
        } catch (error:any) {
            return next(new ErrorHandler(error.message,500))
        }
        const courId:any=course?._id;
        user?.courses.push(courId);
        await user?.save();
        await notificationModel.create({
            user:user?._id,
            title:"New order received",
            message:`You have a new order for ${course.name}`,
        });
        course.purchased ? course.purchased=course.purchased+1:course.purchased;

      await course.save();
                newOrder(data,res,next);

    }catch(error:any){
        return next(new ErrorHandler(error.message,400))
    }
})
export const getAllOrders = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);