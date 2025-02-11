import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  getListCategory,
  updateCategory,
} from "../controllers/categoryController";
import { verifyToken } from "../middleware";
const route = express.Router();

const categoryApiRoutes = () => {
  route.get("/list-category", getListCategory);
  route.get("/all-category", getAllCategory);
  route.get("/get-category/:categoryId", getCategoryById);
  route.post("/create-category", verifyToken, createCategory);
  route.put("/update-category/:categoryId", verifyToken, updateCategory);
  route.delete("/delete-category/:categoryId", verifyToken, deleteCategory);

  return route;
};

export default categoryApiRoutes;
