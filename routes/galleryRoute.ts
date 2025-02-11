import express from "express";
import {
  createGallery,
  deleteGalleryOfProduct,
  getAllGalleryOfProduct,
} from "../controllers/galleryController";
import { verifyToken } from "../middleware";
const route = express.Router();

const galleryApiRoutes = () => {
  route.get("/list-gallery/:proId", getAllGalleryOfProduct);
  route.post("/create-gallery", verifyToken, createGallery);
  route.delete("/delete-gallery/:galId", verifyToken, deleteGalleryOfProduct);

  return route;
};

export default galleryApiRoutes;
