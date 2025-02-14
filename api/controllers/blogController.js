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
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getAllBlog = void 0;
const response_1 = require("../config/response");
const BlogModel_1 = __importDefault(require("../models/BlogModel"));
const service_1 = require("../service");
const getAllBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { current, pageSize } = req.query;
        if (!current)
            current = "1";
        if (!pageSize)
            pageSize = "10";
        const totalItems = (yield BlogModel_1.default.find({})).length;
        const totalPages = Math.ceil(totalItems / +pageSize);
        const skip = (+current - 1) * +pageSize;
        const result = yield BlogModel_1.default
            .find({})
            .limit(+pageSize)
            .skip(skip)
            .sort({ _id: -1 });
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
exports.getAllBlog = getAllBlog;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, images, description } = req.body;
        if (!title || !images || !description) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Missing field required!`,
            });
        }
        if (!Array.isArray(images)) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Field images not array!"
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
        const result = yield BlogModel_1.default.create({ title, images, description });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 201,
            message: "Created Successfully",
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
exports.createBlog = createBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        const { title, images, description } = req.body;
        if (!blogId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Missing required parameter category id`,
            });
        }
        const checkBlogId = yield (0, service_1.checkBlogIdExist)(blogId);
        if (!checkBlogId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not found blog with id: ${blogId}`,
            });
        }
        if (!title || !images || !description) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Missing field required!`,
            });
        }
        if (!Array.isArray(images)) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Field images not array!"
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
        yield BlogModel_1.default.findByIdAndUpdate(blogId, { title, images, description });
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
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        if (!blogId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Missing required parameter category id`,
            });
        }
        const checkBlogId = yield (0, service_1.checkBlogIdExist)(blogId);
        if (!checkBlogId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not found blog with id: ${blogId}`,
            });
        }
        yield BlogModel_1.default.findByIdAndDelete(blogId);
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
exports.deleteBlog = deleteBlog;
