import { Request,Response,NextFunction } from "express"
import { catchAsyncError } from "./catchAsyncError"
import jwt,{JwtPayload} from "jsonwebtoken"
import ErrorHandler from "../utils/ErrorHandler"
import { redis } from "../utils/redis"


//authenticated user
export const isAuthenticated=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    const access_token=req.cookies.access_token as string;
    console.log("hello");
    
    console.log(req.cookies);
    
    if(!access_token){
        return next(new ErrorHandler("Please login to access this resource",400));
    }
    const decoded=jwt.verify(access_token,process.env.ACCESS_TOKEN as string) as JwtPayload;

    if(!decoded){
        return next(new ErrorHandler("access token is not valid!",400))
    }

    const user=await redis.get(decoded.id);

    if(!user){
        return next(new ErrorHandler("user not found",400))
    }
    req.user=JSON.parse(user);
    next();

})



//validate user role
export const authorizedRoles=(...roles:string[])=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        console.log(req.user?.role);
        
        if(!roles.includes(req.user?.role || '')){
            return next(new ErrorHandler(`Roles: ${req.user?.role} is not allowed to ceess this resource`,403))
        }
        next();
    }
}