import express from 'express'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth';
import { updateAccessToken } from '../controllers/user';
import { getNotification, updateNotification } from '../controllers/notification';
const notificationRouter=express.Router();
notificationRouter.get("/get-all-notifications",getNotification);
notificationRouter.put("/update-notifications/:id",updateAccessToken,isAuthenticated,updateNotification);

export default notificationRouter;