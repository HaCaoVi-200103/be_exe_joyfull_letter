import express from "express";
import verifyToken from "../middleware";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";
const route = express.Router();

const categoryApiRoutes = () => {
  route.get("/list-category", getAllCategory);
  route.get("/get-category/:categoryId", getCategoryById);
  route.post("/create-category", verifyToken, createCategory);
  route.put("/update-category/:categoryId", verifyToken, updateCategory);
  route.delete("/delete-category/:categoryId", verifyToken, deleteCategory);

  return route;
};

export default categoryApiRoutes;
