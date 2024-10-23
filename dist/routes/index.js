"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRoute_1 = __importDefault(require("../routes/ProductRoute"));
const Auth_1 = __importDefault(require("../routes/Auth"));
const StaffRoute_1 = __importDefault(require("../routes/StaffRoute"));
const UploadFile_1 = __importDefault(require("../routes/UploadFile"));
/* GET home page. */
const initApiRoutes = (app) => {
    (0, ProductRoute_1.default)(app);
    (0, Auth_1.default)(app);
    (0, StaffRoute_1.default)(app);
    (0, UploadFile_1.default)(app);
};
exports.default = initApiRoutes;
