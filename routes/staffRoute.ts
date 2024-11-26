import express from "express";
const route = express.Router();

/* GET home page. */

const staffApiRoutes = () => {
  route.post("/staff");

  return route;
};

export default staffApiRoutes;
