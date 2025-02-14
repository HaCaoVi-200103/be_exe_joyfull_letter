"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const route = express_1.default.Router();
/* GET home page. */
const authApiRoutes = () => {
    route.post("/auth/login", authController_1.login);
    return route;
};
exports.default = authApiRoutes;
