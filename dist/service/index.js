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
exports.checkBlogIdExist = exports.checkStockProIdExist = exports.checkGalleryIdExist = exports.checkImagesGalleryByProId = exports.giveCurrentDateTime = exports.checkEmail = exports.checkCategoryById = exports.checkSeedById = exports.checkCateById = exports.checkProductById = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
const StaffModel_1 = __importDefault(require("../models/StaffModel"));
const SeedModel_1 = __importDefault(require("../models/SeedModel"));
const GalleryModel_1 = __importDefault(require("../models/GalleryModel"));
const StockModel_1 = __importDefault(require("../models/StockModel"));
const BlogModel_1 = __importDefault(require("../models/BlogModel"));
const checkProductById = (proId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkProId = yield ProductModel_1.default.findOne({ _id: proId }).where({
            is_deleted: false,
        });
        if (!checkProId) {
            return false;
        }
        return checkProId;
    }
    catch (error) {
        return false;
    }
});
exports.checkProductById = checkProductById;
const checkCateById = (cateId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkCateId = yield CategoryModel_1.default.findOne({ _id: cateId }).where({
            is_deleted: false,
        });
        if (!checkCateId) {
            console.log("Not found category with id: ", cateId);
            return false;
        }
        return true;
    }
    catch (error) {
        console.log("Not found category with id: ", cateId);
        return false;
    }
});
exports.checkCateById = checkCateById;
const checkSeedById = (seedId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkSeedId = yield SeedModel_1.default.findOne({ _id: seedId }).where({
            is_deleted: false,
        });
        if (!checkSeedId) {
            return false;
        }
        return checkSeedId;
    }
    catch (error) {
        return false;
    }
});
exports.checkSeedById = checkSeedById;
const checkCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield CategoryModel_1.default.findOne({ _id: categoryId }).where({
            is_deleted: false,
        });
        if (!check) {
            console.log("Not found seed with id: ", categoryId);
            return false;
        }
        return true;
    }
    catch (error) {
        console.log("Not found seed with id: ", categoryId);
        return false;
    }
});
exports.checkCategoryById = checkCategoryById;
const checkEmail = (req, res, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailCheck = yield StaffModel_1.default.findOne({ staff_email: email });
        if (!emailCheck) {
            console.log("Email not exist");
            return null;
        }
        return emailCheck;
    }
    catch (error) {
        console.log("Email not exist");
        return null;
    }
});
exports.checkEmail = checkEmail;
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;
    return dateTime;
};
exports.giveCurrentDateTime = giveCurrentDateTime;
const checkImagesGalleryByProId = (proId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield GalleryModel_1.default.findOne({ pro_id: proId });
        if (!check) {
            console.log("Not found seed with id: ", proId);
            return false;
        }
        return true;
    }
    catch (error) {
        console.log("Not found seed with id: ", proId);
        return false;
    }
});
exports.checkImagesGalleryByProId = checkImagesGalleryByProId;
const checkGalleryIdExist = (galId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield GalleryModel_1.default.findById(galId);
        if (!check) {
            return false;
        }
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.checkGalleryIdExist = checkGalleryIdExist;
const checkStockProIdExist = (proId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield StockModel_1.default.findOne({ pro_id: proId });
        if (!result) {
            return false;
        }
        return result;
    }
    catch (error) {
        return false;
    }
});
exports.checkStockProIdExist = checkStockProIdExist;
const checkBlogIdExist = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield BlogModel_1.default.findById(blogId);
        if (!result) {
            return false;
        }
        return result;
    }
    catch (error) {
        return false;
    }
});
exports.checkBlogIdExist = checkBlogIdExist;
