"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
/* GET home page. */
const staffApiRoutes = (app) => {
    route.post('/staff');
    return app.use('/api/v1/', route);
};
exports.default = staffApiRoutes;
