require('dotenv').config();
import {Request,Response,NextFunction} from 'express';
import { catchAsyncError } from '../middlewares/catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import CourseModel from '../models/Course_model';
import cloudinary from 'cloudinary'
import { createCourse, getAllCoursesService } from '../services/services';
import { redis } from '../utils/redis';
import mongoose, { mongo } from 'mongoose';
import { MongoTopologyClosedError } from 'mongodb';
import { isTemplateLiteral } from 'typescript';
import { userInfo } from 'os';
import ejs from "ejs"
import axios from 'axios'
import path from 'path';
import sendMail from '../utils/sendMail';
import notificationModel from '../models/Notification-model';
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});
//upload course
export const uploadCourse=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const data=req.body;
        const thumbnail=data.thumbnail;
        if(thumbnail){
            const myCloud=await cloudinary.v2.uploader.upload(thumbnail,{
                folder:"courses"
            });
            data.thumbnail={
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
        createCourse(data,res,next);
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})

export const editCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;

      const courseId = req.params.id;

      const courseData = await CourseModel.findById(courseId) as any;

      if (thumbnail && !thumbnail?.startsWith("https")) {
        await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (thumbnail?.startsWith("https")) {
        data.thumbnail = {
          public_id: courseData?.thumbnail.public_id,
          url: courseData?.thumbnail.url,
        };
      }

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


//export singhle course-non authenticated wala

export const getSingleCourse=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const courseId=req.params.id;
        const isCacheExist=await redis.get(courseId);
        if(isCacheExist){
            const course=JSON.parse(isCacheExist);
            res.status(200).json({
                success:true,
                course,
            })
        }else{
            const course=await CourseModel.findById(req.params.id).select('-courseData.videoUrl -courseData.suggestion -corseData.questions -courseData.links')
            await redis.set(courseId,JSON.stringify(course));
        res.status(200).json({
            success:true,
            course,
        })
        }
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})

//get all courses without authentiate
export const getAllCourse=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        // const isCacheExist=await redis.get("allCourses");
        // if(isCacheExist){
        //     const course=JSON.parse(isCacheExist);
        //     res.status(200).json({
        //         success:true,
        //         course,
        //     })
        // }else{
            const course=await CourseModel.find().select('-courseData.videoUrl -courseData.suggestion -corseData.questions -courseData.links')
            // await redis.set("allCourses",JSON.stringify(course));
        res.status(200).json({
            success:true,
            course,
        })
        
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})
//get course content only for valid authenticated user

export const getCourseByUser=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 404)
        );
      }

      const course = await CourseModel.findById(courseId);

      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
})



//add question in course
interface IAddQuestionData{
    comment:string;
    courseId:string;
    contentId:string;
}



export const addQuestion=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {comment,courseId,contentId}=req.body as IAddQuestionData;
        const course=await CourseModel.findById(courseId);
        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler("Invalid content id",400))
        }
        const courseCOntent=course?.courseData?.find((item:any)=>item._id.equals(contentId));
        if(!courseCOntent){
            return next(new ErrorHandler("Invalid conetnt id",400));
        }
        const newQuestion:any={
            user:req.user,
            comment,
            commentReplies:[],
        }
        courseCOntent.questions.push(newQuestion);
        //save updated course after question ko add karna
        
        await notificationModel.create({
            user:req.user?._id,
            title:"New question recieved",
            message:`You have a new question in ${courseCOntent.title}`,
        });
        await course?.save();
        res.status(200).json({
            success:true,
            course,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})


//add awnser to comments?
interface IAddAnswer{
    answer:string;
    courseId:string;
    contentId:string;
    commentId:string;
}

export const addAnswer=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {answer,commentId,courseId,contentId}=req.body as IAddAnswer;
        const course=await CourseModel.findById(courseId);
        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler("Invalid content id",400))
        }
        const courseCOntent=course?.courseData?.find((item:any)=>item._id.equals(contentId));
        if(!courseCOntent){
            return next(new ErrorHandler("Invalid conetnt id",400));
        }
        const question=courseCOntent?.questions?.find((item:any)=>
            item._id.equals(commentId)
        )
        if(!question){
            return next(new ErrorHandler("Invalid question id",400));
        }
        const newAnswer:any={
            user:req?.user,
            answer,
        }
        question?.commentReplies?.push(newAnswer);
        //save updated course after question ko add karna
        await course?.save();
        if(req.user?._id === question.user?._id){
            //create a notification model here in future
            await notificationModel.create({
            user:req.user?._id,
            title:"New question reply recieved",
            message:`You have a new question in ${courseCOntent.title}`,
        });
        }else{
            const data={
                name:question.user.name,
                title:courseCOntent.title,
            }
            const html=await ejs.renderFile(
                path.join(__dirname,"../mails/question-reply.ejs"),data)
                try {
                    await sendMail({
                        email:question.user.email,
                        subject:"Question-reply",
                        template:"question-reply.ejs",
                        data,
                    })
                } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
        }
        res.status(200).json({
            success:true,
            course,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})


//add review 
interface IAddReview{
    rating:number;
    comment:string;
    userId:string;
}

export const addReview=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userCourseList=req.user?.courses;
        const courseId=req.params.id;
        const courseExists=userCourseList?.some((course:any)=>course._id.toString()===courseId.toString());
        if(!courseExists){
            return next(new ErrorHandler("You are not enrolled in this course",400))
        }
        const course=await CourseModel.findById(courseId);
        const {comment,rating}=req.body as IAddReview;
        const reviewData:any={
            user:req.user,
            rating,
            comment:comment,
        }
        course?.reviews.push(reviewData)
        let avg=0;
        course?.reviews.forEach((rev:any)=>{
            avg+=rev.rating;
        })
        if(course){
            course.ratings=avg/course.reviews.length;
        }
        await course?.save();
        const notification={
            title:"New Review received",
            message:`${req.user?.name} has gievn a review in ${course?.name}`
        }
        //create karenge notification for admin panel
        res.status(200).json({
            success:true,
            course,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})



//add rely to reviews
interface IAddReplyToReview{
    comment:string;
    courseId:string;
    reviewId:string;
}

export const addReplyToReview=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {comment,reviewId,courseId}=req.body as IAddReplyToReview;
        const course=await CourseModel.findById(courseId);
        if(!course){
            return next(new ErrorHandler("Course not found",404));
        }
        const review=course?.reviews?.find((rev:any)=>rev._id.toString()===reviewId);
        if(!review){
            return next(new ErrorHandler("Review not found",404));
        }
        const replyData:any={
            user:req.user,
            comment,
        }
        if(!review.commentReplies){
            review.commentReplies=[];
        }
        review.commentReplies?.push(replyData);
        await course?.save();

        
        res.status(200).json({
            success:true,
            course,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})



// get all courses --- only for admin
export const getAdminAllCourses = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const generateVideoUrl = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { videoId } = req.body;
        const response = await axios.post(
            `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            { ttl: 300 },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
                },
                timeout: 5000, // Set a timeout of 5 seconds
            }
        );
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error: any) {
        console.error('Error generating video URL:', error.message);
        return next(new ErrorHandler(error.message, 400));
    }
});

export const deleteCourse=catchAsyncError(async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id}=req.params;
        const course=await CourseModel.findById(id);
        if(!course){
            return next(new ErrorHandler("Course not found",404));
        }
        await course.deleteOne({id});
        await redis.del(id)
        res.status(200).json({
            success:true,
            message:"Course deleted successfully",
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400))
    }
})







