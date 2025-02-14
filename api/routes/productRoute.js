"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../controllers/productController");
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const route = express_1.default.Router();
const productApiRoutes = () => {
    route.get("/list-product", productController_1.getListProduct);
    route.get("/get-product/:proId", productController_1.getProductID);
    route.get("/filter-search", productController_1.handleFilterAndSearch);
    route.post("/create-product", middleware_1.verifyToken, productController_1.createProduct);
    route.put("/update-product/:proId", middleware_1.verifyToken, productController_1.updateProductById);
    route.delete("/delete-product/:proId", middleware_1.verifyToken, productController_1.deleteProductById);
    return route;
};
exports.default = productApiRoutes;
