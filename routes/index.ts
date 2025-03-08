import { Express } from "express";
import productApiRoutes from "./productRoute";
import authApiRoutes from "./authRoute";
import uploadApiRoutes from "./uploadFileRoute";
import seedApiRoutes from "./seedRoute";
import categoryApiRoutes from "./categoryRoute";
import galleryApiRoutes from "./galleryRoute";
import blogApiRoutes from "./blogRoute";
import orderApiRoutes from "./orderRoute";

const initApiRoutes = (app: Express) => {
  app.use(process.env.VERSION_API || "", productApiRoutes());
  app.use(process.env.VERSION_API || "", authApiRoutes());
  app.use(process.env.VERSION_API || "", uploadApiRoutes());
  app.use(process.env.VERSION_API || "", seedApiRoutes());
  app.use(process.env.VERSION_API || "", categoryApiRoutes());
  app.use(process.env.VERSION_API || "", galleryApiRoutes());
  app.use(process.env.VERSION_API || "", blogApiRoutes());
  app.use(process.env.VERSION_API || "", orderApiRoutes());
  return app;
};

export default initApiRoutes;
