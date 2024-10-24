"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../../controllers/AuthController");
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
/* GET home page. */
const authApiRoutes = (app) => {
    route.post('/login', AuthController_1.login);
    return app.use('/api/v1/auth', route);
};
exports.default = authApiRoutes;
