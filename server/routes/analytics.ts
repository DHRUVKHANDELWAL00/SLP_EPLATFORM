import express from 'express'
import { authorizedRoles,isAuthenticated } from '../middlewares/auth'
import { getUserAnalytics,getCourseAnalytics,getOrderAnalytics } from '../controllers/analytics'
const analyticsRouter=express.Router()

analyticsRouter.get("/get-user-analytics",isAuthenticated,authorizedRoles("admin"),getUserAnalytics)
analyticsRouter.get("/get-course-analytics",isAuthenticated,authorizedRoles("admin"),getCourseAnalytics)
analyticsRouter.get("/get-order-analytics",isAuthenticated,authorizedRoles("admin"),getOrderAnalytics);
export default analyticsRouter;