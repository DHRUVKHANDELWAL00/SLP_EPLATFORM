import express from 'express'
import { authorizedRoles, isAuthenticated } from '../middlewares/auth';
import { addAnswer, addQuestion, addReplyToReview, addReview, editCourse, getAllCourse, getCourseByUser, getSingleCourse, uploadCourse } from '../controllers/course';
const courseRouter=express.Router();
courseRouter.post("/createCourse",isAuthenticated,authorizedRoles("user"),uploadCourse)
courseRouter.post("/editCourse/:id",isAuthenticated,authorizedRoles("user"),editCourse)
courseRouter.get("/getSingleCourse/:id",getSingleCourse)
courseRouter.get("/getAllCourse",getAllCourse)
courseRouter.get("/get-course-content/:id",isAuthenticated,getCourseByUser)
courseRouter.put("/addQuestion",isAuthenticated,addQuestion);
courseRouter.put("/addAnswer",isAuthenticated,addAnswer);
courseRouter.put("/addReview/:id",isAuthenticated,addReview);
courseRouter.put("/addReplyToReview",isAuthenticated,addReplyToReview);
courseRouter.get("/getAllCourses",isAuthenticated,authorizedRoles("user"),getAllCourse);


export default courseRouter;