import express, { Express } from "express";
import verifyToken from "../../middleware";
import {
  createGallery,
  getAllGallaryOfProduct,
} from "../../controllers/GalleryController";
const route = express.Router();

const galleryApiRoutes = (app: Express) => {
  route.get("/:proId", getAllGallaryOfProduct);
  route.post("/create", createGallery);
  route.put("/:proId", verifyToken);
  route.delete("/:proId", verifyToken);

  return app.use("/api/v1/gallery", route);
};

export default galleryApiRoutes;
