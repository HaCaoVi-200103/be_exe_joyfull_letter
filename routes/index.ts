import { Express } from "express";
import productApiRoutes from "./productRoute";
import authApiRoutes from "./authRoute";
import staffApiRoutes from "./staffRoute";
import uploadApiRoutes from "./uploadFileRoute";
import seedApiRoutes from "./seedRoute";
import categoryApiRoutes from "./categoryRoute";
import galleryApiRoutes from "./galleryRoute";

const initApiRoutes = (app: Express) => {
  app.use(process.env.VERSION_API || "", productApiRoutes());
  app.use(process.env.VERSION_API || "", authApiRoutes());
  app.use(process.env.VERSION_API || "", staffApiRoutes());
  app.use(process.env.VERSION_API || "", uploadApiRoutes());
  app.use(process.env.VERSION_API || "", seedApiRoutes());
  app.use(process.env.VERSION_API || "", categoryApiRoutes());
  app.use(process.env.VERSION_API || "", galleryApiRoutes());
  return app;
};

export default initApiRoutes;
