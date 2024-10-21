"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
/* GET home page. */
const initApiRoutes = (app) => {
    route.get('/', (req, res) => {
        res.status(200);
        res.end("Project EXE");
    });
    return app.use('/', route);
    ;
};
exports.default = initApiRoutes;
