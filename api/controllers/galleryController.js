"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGalleryOfProduct = exports.createGallery = exports.getAllGalleryOfProduct = void 0;
const GalleryModel_1 = __importDefault(require("../models/GalleryModel"));
const service_1 = require("../service");
const response_1 = require("../config/response");
const getAllGalleryOfProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { proId } = req.params;
        if (!proId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Missing required parameter product id!`,
            });
        }
        const check = yield (0, service_1.checkImagesGalleryByProId)(proId);
        if (!check) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Product ID not found with id ${proId}`
            });
        }
        const list = yield GalleryModel_1.default.find({ pro_id: proId });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            data: list
        });
    }
    catch (error) {
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.getAllGalleryOfProduct = getAllGalleryOfProduct;
const createGallery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { proId, images } = req.body;
        if (!proId || !images || !Array.isArray(images)) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Missing required field or field images not array!"
            });
        }
        for (const item of images) {
            if (typeof item !== "string") {
                return (0, response_1.ResponseConfig)(res, {
                    statusCode: 400,
                    message: "Images not array contains string!"
                });
            }
        }
        for (const item of images) {
            yield GalleryModel_1.default.create({ pro_id: proId, gal_picture: item });
        }
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 201,
            message: "Created Successfully"
        });
    }
    catch (error) {
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.createGallery = createGallery;
const deleteGalleryOfProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { galId } = req.params;
        if (!galId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Missing required parameter gallery id!`,
            });
        }
        const check = yield (0, service_1.checkGalleryIdExist)(galId);
        if (!check) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Gallery ID not found with id ${galId}`
            });
        }
        const result = yield GalleryModel_1.default.findByIdAndDelete(galId);
        return (0, response_1.ResponseConfig)(res, {
            message: "Deleted",
            statusCode: 200,
            data: result
        });
    }
    catch (error) {
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.deleteGalleryOfProduct = deleteGalleryOfProduct;
