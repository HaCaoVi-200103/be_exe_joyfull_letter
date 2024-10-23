"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../../middleware"));
const ProductController_1 = require("../../controllers/ProductController");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
/* GET home page. */
const productApiRoutes = (app) => {
    route.get('/list-product', ProductController_1.getListProduct);
    route.get('/get-product/:proId', ProductController_1.getProductID);
    route.post('/create-product', middleware_1.default, ProductController_1.createProduct);
    route.put('/update-product/:proId', middleware_1.default, ProductController_1.updateProductById);
    route.delete('/delete-product/:proId', middleware_1.default, ProductController_1.deleteProductById);
    return app.use('/api/v1', route);
};
exports.default = productApiRoutes;
