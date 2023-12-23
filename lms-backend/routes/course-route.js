import Express from "express";
import {
  createCourse,
  getAllCourses,
  getOneCourse,
  updataTitle,
  addAttachments,
  deleteAttachments,
  purchaseCourse,
  deleteCourse,
  getPurchasedCourses,
} from "../controllers/course-controller.js";
const courseRouter = Express.Router();

courseRouter.get("/", getAllCourses);
courseRouter.get("/user/:userId/purchased", getPurchasedCourses);
courseRouter.get("/:courseId", getOneCourse);
courseRouter.post("/", createCourse);
courseRouter.post("/:courseId/attachments", addAttachments);
courseRouter.post("/:courseId/user/:userId/purchased", purchaseCourse);
courseRouter.patch("/:courseId", updataTitle);
courseRouter.delete("/:courseId", deleteCourse);
courseRouter.delete("/:courseId/attachments/:attachmentIdx", deleteAttachments);

export default courseRouter;
