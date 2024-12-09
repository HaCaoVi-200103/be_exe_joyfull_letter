import verifyToken from "../middleware";
import {
  createProduct,
  deleteProductById,
  getListProduct,
  getProductID,
  updateProductById,
} from "../controllers/productController";
import express from "express";
const route = express.Router();

const productApiRoutes = () => {
  route.get("/list-product", getListProduct);
  route.get("/get-product/:proId", getProductID);
  route.post("/create-product", verifyToken, createProduct);
  route.put("/update-product/:proId", verifyToken, updateProductById);
  route.delete("/delete-product/:proId", verifyToken, deleteProductById);

  return route;
};

export default productApiRoutes;