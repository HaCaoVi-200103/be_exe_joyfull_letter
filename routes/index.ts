import { Express } from "express";
import productApiRoutes from "../routes/ProductRoute";
import authApiRoutes from "../routes/Auth";
import staffApiRoutes from "../routes/StaffRoute";
import uploadApiRoutes from "../routes/UploadFile";
import seedApiRoutes from "../routes/SeedRoute";
import categoryApiRoutes from "./CategoryRoute";
import galleryApiRoutes from "./GalleryRoute";
/* GET home page. */

const initApiRoutes = (app: Express) => {
  productApiRoutes(app);
  authApiRoutes(app);
  staffApiRoutes(app);
  uploadApiRoutes(app);
  seedApiRoutes(app);
  categoryApiRoutes(app);
  galleryApiRoutes(app);
};

export default initApiRoutes;
