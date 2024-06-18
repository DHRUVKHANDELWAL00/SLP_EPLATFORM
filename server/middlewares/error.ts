import { NextFunction,Request,Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
export const ErrorMiddleware=(err:any,req:Request,res:Response,next:NextFunction)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || 'internal server error';
//wrong mongodb id hui agar
    if(err.name==='CastError'){
        const message=`resource not found . Invalid: ${err.path}`;
        err=new ErrorHandler(message,400);
    }
    //duplicate key errror
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
        err=new ErrorHandler(message,400);
    }
    //wrong jwt error
    if(err.name==='JsonWebTokenError'){
        const message=`json web token invalid, try agian`;
        err=new ErrorHandler(message,400);
    }
     if(err.name==='TokenExpiredError'){
        const message=`json web token experied, try agian`;
        err=new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
}