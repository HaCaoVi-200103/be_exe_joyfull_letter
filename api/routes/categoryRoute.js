"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const middleware_1 = require("../middleware");
const route = express_1.default.Router();
const categoryApiRoutes = () => {
    route.get("/list-category", categoryController_1.getListCategory);
    route.get("/all-category", categoryController_1.getAllCategory);
    route.get("/get-category/:categoryId", categoryController_1.getCategoryById);
    route.post("/create-category", middleware_1.verifyToken, categoryController_1.createCategory);
    route.put("/update-category/:categoryId", middleware_1.verifyToken, categoryController_1.updateCategory);
    route.delete("/delete-category/:categoryId", middleware_1.verifyToken, categoryController_1.deleteCategory);
    return route;
};
exports.default = categoryApiRoutes;
