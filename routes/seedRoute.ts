import express from "express";
import verifyToken from "../middleware";
import {
  createSeed,
  deleteSeed,
  getAllSeed,
  getSeedById,
  updateSeed,
} from "../controllers/seedController";
const route = express.Router();

const seedApiRoutes = () => {
  route.get("/list", getAllSeed);
  route.get("/:seedId", getSeedById);
  route.post("/create", verifyToken, createSeed);
  route.put("/:seedId", verifyToken, updateSeed);
  route.delete("/:seedId", verifyToken, deleteSeed);

  return route;
};

export default seedApiRoutes;
