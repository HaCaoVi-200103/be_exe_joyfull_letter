import express from "express";
import verifyToken from "../middleware";
import {
  createGallery,
  getAllGallaryOfProduct,
} from "../controllers/galleryController";
const route = express.Router();

const galleryApiRoutes = () => {
  route.get("/list-gallery/:proId", getAllGallaryOfProduct);
  route.post("/create-gallery", createGallery);
  route.put("/update-gallery/:proId", verifyToken);
  route.delete("/delete-gallery/:proId", verifyToken);

  return route;
};

export default galleryApiRoutes;
