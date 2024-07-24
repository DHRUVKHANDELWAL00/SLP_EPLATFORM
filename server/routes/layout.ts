import express from 'express'
import { authorizedRoles,isAuthenticated } from '../middlewares/auth'
import { createLayout,editLayout,getLayoutByType } from '../controllers/layout'
const layoutRouter=express.Router()
layoutRouter.post('/createLayout',isAuthenticated,authorizedRoles("admin"),createLayout)
layoutRouter.put('/editLayout',isAuthenticated,authorizedRoles("admin"),editLayout)

layoutRouter.get("/get-layout/:type",getLayoutByType);

export default layoutRouter;
