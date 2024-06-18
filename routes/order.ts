import express from 'express'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth';
import { createOrder, getAllOrders } from '../controllers/order';
const orderRouter=express.Router();
orderRouter.post("/createOrder",isAuthenticated,createOrder);
orderRouter.get("/getAllOrders",isAuthenticated,authorizedRoles("user"),getAllOrders);


export default orderRouter;