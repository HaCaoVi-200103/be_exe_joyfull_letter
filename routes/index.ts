import { Express } from "express";
import productApiRoutes from '../routes/ProductRoute';
import authApiRoutes from '../routes/Auth';
import staffApiRoutes from '../routes/StaffRoute';
import uploadApiRoutes from "../routes/UploadFile";
/* GET home page. */

const initApiRoutes = (app: Express) => {
    productApiRoutes(app);
    authApiRoutes(app)
    staffApiRoutes(app)
    uploadApiRoutes(app)

}

export default initApiRoutes;
