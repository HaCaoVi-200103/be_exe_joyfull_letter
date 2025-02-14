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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getListCategory = exports.getAllCategory = void 0;
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
const service_1 = require("../service");
const response_1 = require("../config/response");
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield CategoryModel_1.default.find({ is_deleted: false });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            data: result
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.getAllCategory = getAllCategory;
const getListCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { current, pageSize } = req.query;
        if (!current)
            current = "1";
        if (!pageSize)
            pageSize = "10";
        const totalItems = (yield CategoryModel_1.default.find({ is_deleted: false })).length;
        const totalPages = Math.ceil(totalItems / +pageSize);
        const skip = (+current - 1) * +pageSize;
        const result = yield CategoryModel_1.default.aggregate([
            { $match: { is_deleted: false } },
            {
                $lookup: {
                    from: "products", // Tên collection của Product (viết đúng theo DB)
                    localField: "_id",
                    foreignField: "cate_id",
                    as: "products"
                }
            },
            {
                $addFields: {
                    product_count: { $size: "$products" }
                }
            },
            {
                $project: {
                    products: 0 // Ẩn danh sách sản phẩm để giảm dữ liệu trả về
                }
            },
            { $sort: { _id: -1 } },
            { $skip: skip },
            { $limit: +pageSize }
        ]);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            data: {
                meta: {
                    current: +current,
                    pageSize: +pageSize,
                    pages: totalPages,
                    total: totalItems,
                },
                result: result,
            }
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.getListCategory = getListCategory;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Missing required parameter: ${categoryId}`,
            });
        }
        const checkCategoryId = yield (0, service_1.checkCategoryById)(categoryId);
        if (!checkCategoryId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `No data category with category id: ${categoryId}`,
            });
        }
        const result = yield CategoryModel_1.default.findById(categoryId);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            data: result
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Missing required fields"
            });
        }
        yield CategoryModel_1.default.create({ cate_name: name });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 201,
            message: "Created Successfully"
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Missing required parameter category id`,
            });
        }
        const checkCategoryId = yield (0, service_1.checkCategoryById)(categoryId);
        if (!checkCategoryId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not found category with id: ${categoryId}`,
            });
        }
        const { name } = req.body;
        if (!name) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Missing required fields"
            });
        }
        yield CategoryModel_1.default.findByIdAndUpdate(categoryId, { cate_name: name });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            message: "Updated Successfully"
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        if (!categoryId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Missing required parameter category id`,
            });
        }
        const checkCategoryId = yield (0, service_1.checkCategoryById)(categoryId);
        if (!checkCategoryId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not found category with id: ${categoryId}`,
            });
        }
        yield CategoryModel_1.default.findByIdAndUpdate(categoryId, { is_deleted: true });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            message: "Deleted Successfully"
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.deleteCategory = deleteCategory;
