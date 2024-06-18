import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import orderModel from "../models/Order-Model";


// create new order
export const newOrder = catchAsyncError(async(data:any,res:Response) => {
    const order = await orderModel.create(data);

    res.status(201).json({
        succcess:true,
        order,
    })

});

// Get All Orders
export const getAllOrdersService = async (res: Response) => {
    const orders = await orderModel.find().sort({ createdAt: -1 });
  
    res.status(201).json({
      success: true,
      orders,
    });
  };
  