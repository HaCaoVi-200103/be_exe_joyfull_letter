import express from "express";
import { createBlog, getAllBlog } from "../controllers/blogController";
const route = express.Router();

const blogApiRoutes = () => {
    route.get("/list-blog", getAllBlog);
    route.get("/get-blog/:blogId",);
    route.post("/create-blog", createBlog);
    route.put("/update-blog/:blogId",);
    route.delete("/delete-blog/:blogId",);

    return route;
};

export default blogApiRoutes;