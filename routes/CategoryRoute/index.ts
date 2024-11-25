import express, { Express } from "express";
import verifyToken from "../../middleware";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../../controllers/CategoryController";
const route = express.Router();

const categoryApiRoutes = (app: Express) => {
  route.get("/list", getAllCategory);
  route.get("/:categoryId", getCategoryById);
  route.post("/create", verifyToken, createCategory);
  route.put("/:categoryId", verifyToken, updateCategory);
  route.delete("/:categoryId", verifyToken, deleteCategory);

  return app.use("/api/v1/category", route);
};

export default categoryApiRoutes;
