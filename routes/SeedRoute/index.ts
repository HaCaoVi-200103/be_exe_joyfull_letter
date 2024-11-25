import express, { Express } from "express";
import verifyToken from "../../middleware";
import {
  createSeed,
  deleteSeed,
  getAllSeed,
  getSeedById,
  updateSeed,
} from "../../controllers/SeedController";
const route = express.Router();

const seedApiRoutes = (app: Express) => {
  route.get("/list", getAllSeed);
  route.get("/:seedId", getSeedById);
  route.post("/create", verifyToken, createSeed);
  route.put("/:seedId", verifyToken, updateSeed);
  route.delete("/:seedId", verifyToken, deleteSeed);

  return app.use("/api/v1/seed", route);
};

export default seedApiRoutes;
