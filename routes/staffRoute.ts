import express from "express";
const route = express.Router();

/* GET home page. */

const staffApiRoutes = () => {
  route.post("/auth/staff");

  return route;
};

export default staffApiRoutes;
