"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const galleryController_1 = require("../controllers/galleryController");
const middleware_1 = require("../middleware");
const route = express_1.default.Router();
const galleryApiRoutes = () => {
    route.get("/list-gallery/:proId", galleryController_1.getAllGalleryOfProduct);
    route.post("/create-gallery", middleware_1.verifyToken, galleryController_1.createGallery);
    route.delete("/delete-gallery/:galId", middleware_1.verifyToken, galleryController_1.deleteGalleryOfProduct);
    return route;
};
exports.default = galleryApiRoutes;
