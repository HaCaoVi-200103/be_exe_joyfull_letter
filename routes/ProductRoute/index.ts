import { getListProduct } from "../../controllers/ProductController";
import express, { Express } from "express";
const route = express.Router();

/* GET home page. */

const productApiRoutes = (app: Express) => {
    route.get('/list-product', getListProduct);
    route.get('/get-product',)
    return app.use('/api/v1', route);;
}

export default productApiRoutes;
