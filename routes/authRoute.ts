import express from "express";
import { getTotal, login } from "../controllers/authController";
const route = express.Router();

/* GET home page. */

const authApiRoutes = () => {
  route.post("/auth/login", login);
  route.get("/total-information", getTotal);

  return route;
};

export default authApiRoutes;
