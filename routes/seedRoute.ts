import express from "express";
import {
  createSeed,
  deleteSeed,
  getAllSeed,
  getSeedById,
  updateSeed,
} from "../controllers/seedController";
import { verifyToken } from "../middleware";
const route = express.Router();

const seedApiRoutes = () => {
  route.get("/list-seed", getAllSeed);
  route.get("/get-seed/:seedId", getSeedById);
  route.post("/create-seed", verifyToken, createSeed);
  route.put("/update-seed/:seedId", verifyToken, updateSeed);
  route.delete("/delete-seed/:seedId", verifyToken, deleteSeed);

  return route;
};

export default seedApiRoutes;
