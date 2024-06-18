import { Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary"
import CourseModel from "../models/Course_model";
export const createCourse=catchAsyncError(async(data:any,res:Response)=>{
    const course=await CourseModel.create(data);
    res.status(201).json({
        success:true,
        course
    })
})
// Get All Courses
export const getAllCoursesService = async (res: Response) => {
    const courses = await CourseModel.find().sort({ createdAt: -1 });
  
    res.status(201).json({
      success: true,
      courses,
    });
  };
  