"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const route = express_1.default.Router();
const blogApiRoutes = () => {
    route.get("/list-blog", blogController_1.getAllBlog);
    route.post("/create-blog", blogController_1.createBlog);
    route.put("/update-blog/:blogId", blogController_1.updateBlog);
    route.delete("/delete-blog/:blogId", blogController_1.deleteBlog);
    return route;
};
exports.default = blogApiRoutes;
