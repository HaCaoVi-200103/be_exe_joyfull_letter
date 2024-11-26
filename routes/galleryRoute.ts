import express from "express";
import verifyToken from "../middleware";
import {
  createGallery,
  getAllGallaryOfProduct,
} from "../controllers/galleryController";
const route = express.Router();

const galleryApiRoutes = () => {
  route.get("/:proId", getAllGallaryOfProduct);
  route.post("/create", createGallery);
  route.put("/:proId", verifyToken);
  route.delete("/:proId", verifyToken);

  return route;
};

export default galleryApiRoutes;
