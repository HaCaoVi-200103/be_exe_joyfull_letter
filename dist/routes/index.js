"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productRoute_1 = __importDefault(require("./productRoute"));
const authRoute_1 = __importDefault(require("./authRoute"));
const staffRoute_1 = __importDefault(require("./staffRoute"));
const uploadFileRoute_1 = __importDefault(require("./uploadFileRoute"));
const seedRoute_1 = __importDefault(require("./seedRoute"));
const categoryRoute_1 = __importDefault(require("./categoryRoute"));
const galleryRoute_1 = __importDefault(require("./galleryRoute"));
const initApiRoutes = (app) => {
    app.use(process.env.VERSION_API || "", (0, productRoute_1.default)());
    app.use(process.env.VERSION_API || "", (0, authRoute_1.default)());
    app.use(process.env.VERSION_API || "", (0, staffRoute_1.default)());
    app.use(process.env.VERSION_API || "", (0, uploadFileRoute_1.default)());
    app.use(process.env.VERSION_API || "", (0, seedRoute_1.default)());
    app.use(process.env.VERSION_API || "", (0, categoryRoute_1.default)());
    app.use(process.env.VERSION_API || "", (0, galleryRoute_1.default)());
    return app;
};
exports.default = initApiRoutes;
