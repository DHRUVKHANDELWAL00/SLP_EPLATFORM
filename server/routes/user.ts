import express from 'express'
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole } from '../controllers/user'
import { isAuthenticated,authorizedRoles } from '../middlewares/auth';
const userRouter=express.Router();
userRouter.post('/registration',registrationUser);
userRouter.post('/activateuser',activateUser);
userRouter.post('/loginuser',loginUser);
userRouter.get('/logout',isAuthenticated,logoutUser);
userRouter.get("/refreshtoken",updateAccessToken)
userRouter.get("/getuserbyid",updateAccessToken,isAuthenticated,getUserInfo)
userRouter.post("/socialAuth",socialAuth)
userRouter.put("/updateUser",updateAccessToken,isAuthenticated,updateUserInfo)
userRouter.put("/updateUserPassword",updateAccessToken,isAuthenticated,updatePassword)
userRouter.put("/updateUserAvatar",updateAccessToken,isAuthenticated,updateProfilePicture)
userRouter.get("/getAllUsers",getAllUsers);
userRouter.put(
  "/update-user",
  isAuthenticated,
  authorizedRoles("admin"),
  
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  deleteUser
);
export default userRouter;