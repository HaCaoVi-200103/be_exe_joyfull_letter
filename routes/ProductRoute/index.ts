import verifyToken from "../../middleware";
import {
  createProduct,
  deleteProductById,
  getListProduct,
  getProductID,
  updateProductById,
} from "../../controllers/ProductController";
import express, { Express } from "express";
const route = express.Router();

const productApiRoutes = (app: Express) => {
  route.get("/list-product", getListProduct);
  route.get("/get-product/:proId", getProductID);
  route.post("/create-product", verifyToken, createProduct);
  route.put("/update-product/:proId", verifyToken, updateProductById);
  route.delete("/delete-product/:proId", verifyToken, deleteProductById);

  return app.use("/api/v1", route);
};

export default productApiRoutes;
