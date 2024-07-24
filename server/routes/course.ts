import express from 'express'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth';
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAdminAllCourses, getAllCourse, getCourseByUser, getSingleCourse, uploadCourse } from '../controllers/course';
import { updateAccessToken } from '../controllers/user';
const courseRouter=express.Router();
courseRouter.post("/createCourse",updateAccessToken,isAuthenticated,uploadCourse)
courseRouter.put("/editCourse/:id",updateAccessToken,isAuthenticated,authorizedRoles("admin"),editCourse)
courseRouter.get("/getSingleCourse/:id",getSingleCourse)
courseRouter.get("/getAllCourse",getAllCourse)
courseRouter.get("/get-course-content/:id",updateAccessToken,isAuthenticated,getCourseByUser)
courseRouter.put("/addQuestion",updateAccessToken,isAuthenticated,addQuestion);
courseRouter.put("/addAnswer",updateAccessToken,isAuthenticated,addAnswer);
courseRouter.put("/addReview/:id",updateAccessToken,isAuthenticated,addReview);
courseRouter.get('/get-admin-courses',isAuthenticated,authorizedRoles("admin"),getAdminAllCourses)
courseRouter.put("/addReplyToReview",updateAccessToken,isAuthenticated,addReplyToReview);
courseRouter.get("/getAllCourses",updateAccessToken,isAuthenticated,authorizedRoles("user"),getAllCourse);
courseRouter.delete("/delete-course/:id",updateAccessToken,isAuthenticated,authorizedRoles("admin"),deleteCourse);
courseRouter.post("/getVdoCipherOTP",generateVideoUrl);
export default courseRouter;