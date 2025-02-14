"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seedController_1 = require("../controllers/seedController");
const middleware_1 = require("../middleware");
const route = express_1.default.Router();
const seedApiRoutes = () => {
    route.get("/list-seed", seedController_1.getAllSeed);
    route.get("/get-seed/:seedId", seedController_1.getSeedById);
    route.post("/create-seed", middleware_1.verifyToken, seedController_1.createSeed);
    route.put("/update-seed/:seedId", middleware_1.verifyToken, seedController_1.updateSeed);
    route.delete("/delete-seed/:seedId", middleware_1.verifyToken, seedController_1.deleteSeed);
    return route;
};
exports.default = seedApiRoutes;
