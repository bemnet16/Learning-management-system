import Express from "express";
import {
  addChapter,
  deleteChapter,
  getAllChapters,
  getOneChapter,
  publishChapter,
  reorderChapter,
  updateChapterInfo,
  getPurchasedChapters,
  getPublishedChapterOfOneCourse,
  updateChapetrProgress,
} from "../controllers/chapter-controller.js";
const chapterRouter = Express.Router();

chapterRouter.get("/:courseId", getAllChapters);
chapterRouter.get("/:courseId/published", getPublishedChapterOfOneCourse);
chapterRouter.get("/:chapterId/course/:courseId", getOneChapter);
chapterRouter.get("/:chapterId/user/:userId", getPurchasedChapters);
chapterRouter.post("/", addChapter);
chapterRouter.post(
  "/:chapterId/course/:courseId/progress",
  updateChapetrProgress
);
chapterRouter.patch("/:chapterId/reorder", reorderChapter);
chapterRouter.patch("/:chapterId/course/:courseId", updateChapterInfo);
chapterRouter.patch("/:chapterId/course/:courseId/publish", publishChapter);
chapterRouter.delete("/:chapterId/course/:courseId", deleteChapter);

export default chapterRouter;
