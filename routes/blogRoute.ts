import express from "express";
import { createBlog, deleteBlog, getAllBlog, updateBlog } from "../controllers/blogController";
const route = express.Router();

const blogApiRoutes = () => {
    route.get("/list-blog", getAllBlog);
    route.post("/create-blog", createBlog);
    route.put("/update-blog/:blogId", updateBlog);
    route.delete("/delete-blog/:blogId", deleteBlog);

    return route;
};

export default blogApiRoutes;