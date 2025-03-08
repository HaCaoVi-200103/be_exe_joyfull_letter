import express from "express";
import { createOrder, getAllOrder, getAllOrderDetails } from "../controllers/orderController";
import { verifyToken } from "../middleware";
const route = express.Router();

const orderApiRoutes = () => {
    route.get("/list-order", verifyToken, getAllOrder);
    route.get("/list-order-detail/:orderId", verifyToken, getAllOrderDetails);
    route.post("create-order", verifyToken, createOrder)

    return route;
};

export default orderApiRoutes;
