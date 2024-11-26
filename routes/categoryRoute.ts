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
  route.get("/list", getAllCategory);
  route.get("/:categoryId", getCategoryById);
  route.post("/create", verifyToken, createCategory);
  route.put("/:categoryId", verifyToken, updateCategory);
  route.delete("/:categoryId", verifyToken, deleteCategory);

  return route;
};

export default categoryApiRoutes;
