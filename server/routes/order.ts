import express from 'express'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth';
import { createOrder, getAllOrders } from '../controllers/order';
import { updateAccessToken } from '../controllers/user';
const orderRouter=express.Router();
orderRouter.post("/createOrder",updateAccessToken,isAuthenticated,createOrder);
orderRouter.get("/getAllOrders",updateAccessToken,isAuthenticated,authorizedRoles("user"),getAllOrders);


export default orderRouter;