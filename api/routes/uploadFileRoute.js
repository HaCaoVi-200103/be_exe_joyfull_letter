"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const uploadFileController_1 = require("../controllers/uploadFileController");
const middleware_1 = require("../middleware");
const route = express_1.default.Router();
const imagerFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        // req.filevalidationError = "Only image files are allowed!"
        return callback(null, false);
    }
    callback(null, true);
};
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (req, file, callback) => imagerFilter(req, file, callback),
});
const uploadApiRoutes = () => {
    route.post("/upload-single-file", 
    // verifyToken,
    upload.single("fileName"), uploadFileController_1.uploadSingleFile);
    route.post("/upload-multiple-file", middleware_1.verifyToken, upload.array("fileList", 6), uploadFileController_1.uploadMultipleFile);
    return route;
};
exports.default = uploadApiRoutes;
