import Express from "express";
import {
  addCategory,
  getAllCategorys,
} from "../controllers/category-controller.js";
const categoryRouter = Express.Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/", getAllCategorys);

export default categoryRouter;
