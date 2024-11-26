import express from "express";
import { login } from "../controllers/authController";
const route = express.Router();

/* GET home page. */

const authApiRoutes = () => {
  route.post("/login", login);

  return route;
};

export default authApiRoutes;
