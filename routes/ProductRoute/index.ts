import { createProduct, deleteProductById, getListProduct, getProductID, updateProductById } from "../../controllers/ProductController";
import express, { Express } from "express";
const route = express.Router();

/* GET home page. */

const productApiRoutes = (app: Express) => {
    route.get('/list-product', getListProduct);
    route.get('/get-product/:proId', getProductID);
    route.post('/create-product', createProduct)
    route.put('/update-product/:proId', updateProductById)
    route.delete('/delete-product/:proId', deleteProductById)

    return app.use('/api/v1', route);
}

export default productApiRoutes;
