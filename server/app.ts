require("dotenv").config()
import express from 'express';
export const app=express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user';
import courseRouter from './routes/course';
import orderRouter from './routes/order';
import notificationRouter from './routes/notification';
import { ErrorMiddleware } from './middlewares/error';
import analyticsRouter from './routes/analytics';
import layoutRouter from './routes/layout';
//body-parser(CLOUDINARY)
app.use(express.json({limit:"50mb"}))
app.use(cookieParser())
app.use(
    cors({
        origin:["http://localhost:3000"],
        credentials:true,
                allowedHeaders:["Content-Type", "Authorization"],
                methods:["GET", "POST", "PUT", "DELETE", "PATCH"]
    })
)

//routes
app.use("/api/v1",userRouter)
app.use("/api/v1",courseRouter)
app.use("/api/v1",orderRouter)
app.use("/api/v1",notificationRouter)
app.use("/api/v1",analyticsRouter)

app.use("/api/v1",layoutRouter);



//testing api
app.get("/",(req,res)=>{
    res.status(200).json("hey from server");
})
app.all("*",(req,res,next)=>{
    const err=new Error(`Route ${req.originalUrl} not found `) as any;
    err.statusCode=404;
    next(err);
})

app.use(ErrorMiddleware)