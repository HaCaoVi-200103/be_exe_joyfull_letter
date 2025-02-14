"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.handleFilterAndSearch = exports.checkFilterAction = exports.deleteProductById = exports.updateProductById = exports.createProduct = exports.getProductID = exports.getListProduct = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const service_1 = require("../service");
const response_1 = require("../config/response");
const mongoose_1 = __importStar(require("mongoose"));
const StockModel_1 = __importDefault(require("../models/StockModel"));
const getListProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { current, pageSize } = req.query;
        if (!current)
            current = "1";
        if (!pageSize)
            pageSize = "10";
        const totalItems = (yield ProductModel_1.default.find({ is_deleted: false })).length;
        const totalPages = Math.ceil(totalItems / +pageSize);
        const skip = (+current - 1) * +pageSize;
        const result = yield ProductModel_1.default
            .find({ is_deleted: false })
            .limit(+pageSize)
            .skip(skip)
            .populate("cate_id", 'cate_name')
            .sort({ _id: -1 });
        const data = [];
        for (const element of result) {
            const check = yield (0, service_1.checkStockProIdExist)(element._id);
            if (check) {
                const quantity = {
                    pro_quantity: +check.stock_import - +check.stock_export
                };
                const config = Object.assign(Object.assign({}, element.toObject()), quantity);
                data.push(config);
            }
            else {
                data.push(element);
            }
        }
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            data: {
                meta: {
                    current: +current,
                    pageSize: +pageSize,
                    pages: totalPages,
                    total: totalItems,
                },
                result: data,
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
exports.getListProduct = getListProduct;
const getProductID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proId = req.params.proId;
        if (!proId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Missing required parameter: ${proId}`
            });
        }
        const result = yield (0, service_1.checkProductById)(proId);
        if (!result) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not found product with id: ${proId}`
            });
        }
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            data: result
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500,
        });
    }
});
exports.getProductID = getProductID;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cate_id, pro_name, pro_price, pro_discount, pro_size, pro_picture, pro_description, pro_quantity } = req.body;
        if (!cate_id ||
            !pro_name ||
            !pro_price ||
            pro_discount === null ||
            !pro_size ||
            !pro_picture ||
            !pro_description ||
            !pro_quantity) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Missing required fields"
            });
        }
        if (!Array.isArray(pro_size) || !pro_size.every((item) => typeof item === "string")) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Product size must be array string!"
            });
        }
        if (typeof pro_price !== "number" || typeof pro_discount !== "number" || typeof pro_quantity !== "number") {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Price & Discount must be number!"
            });
        }
        if (pro_discount < 0 || pro_price < 0 || pro_discount > pro_price) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Price & Discount must be greater or equal 0. Price must be greater than discount!`
            });
        }
        if (pro_quantity < 0) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Quantity must be greater or equal 0`,
            });
        }
        const checkCateId = yield (0, service_1.checkCateById)(cate_id);
        if (!checkCateId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not found category with id: ${cate_id}`,
            });
        }
        const result = yield ProductModel_1.default.create({
            cate_id,
            pro_name,
            pro_price,
            pro_discount,
            pro_size,
            pro_picture,
            pro_description,
        });
        yield StockModel_1.default.create({ pro_id: result._id, stock_import: pro_quantity, stock_export: 0 });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 201,
            message: `Create Successfully`,
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
exports.createProduct = createProduct;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proId = req.params.proId;
        if (!proId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Missing required parameter product id!`,
            });
        }
        const checkProId = yield (0, service_1.checkProductById)(proId);
        if (!checkProId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not found product with id: ${proId}`
            });
        }
        const { cate_id, pro_name, pro_price, pro_discount, pro_quantity, pro_size, pro_picture, pro_description, } = req.body;
        if (!cate_id ||
            !pro_name ||
            !pro_price ||
            !pro_discount ||
            !pro_size ||
            !pro_picture === null ||
            !pro_description ||
            !pro_quantity) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Missing required fields"
            });
        }
        if (typeof pro_price !== "number" || typeof pro_discount !== "number" || typeof pro_quantity !== "number") {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Price & Discount must be number!"
            });
        }
        if (pro_discount < 0 || pro_price < 0 || pro_discount > pro_price) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Price & Discount must be greater or equal 0. Price must be greater than discount!`
            });
        }
        if (pro_quantity < 0) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Quantity must be greater or equal 0`,
            });
        }
        const checkCateId = yield (0, service_1.checkCateById)(cate_id);
        if (!checkCateId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not category with id: ${cate_id}`
            });
        }
        const result = yield ProductModel_1.default.findByIdAndUpdate(proId, {
            cate_id: cate_id,
            pro_name: pro_name,
            pro_price: pro_price,
            pro_discount: pro_discount,
            pro_size: pro_size,
            pro_picture: pro_picture,
            pro_description: pro_description,
            update_at: new Date(),
        }, { new: true });
        yield StockModel_1.default.findOneAndUpdate({ pro_id: new mongoose_1.Types.ObjectId(proId), stock_import: pro_quantity });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            message: `Update Successfully`,
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
exports.updateProductById = updateProductById;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proId = req.params.proId;
        if (!proId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Missing required parameter proId"
            });
        }
        const checkProId = yield (0, service_1.checkProductById)(proId);
        if (!checkProId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not found product with id: ${proId}`
            });
        }
        yield ProductModel_1.default.findByIdAndUpdate(proId, { is_deleted: true });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            message: "Delete Successfully"
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.deleteProductById = deleteProductById;
const checkFilterAction = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const checkCate = yield (0, service_1.checkCateById)(filter);
    if (checkCate === true) {
        return { cate_id: new mongoose_1.default.Types.ObjectId(filter) };
    }
    else {
        return {};
    }
});
exports.checkFilterAction = checkFilterAction;
const handleFilterAndSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { current, pageSize, search, filterReq } = req.query;
        if (!current)
            current = "1";
        if (!pageSize)
            pageSize = "10";
        if (!search)
            search = "";
        if (!filterReq)
            filterReq = "";
        const totalItems = (yield ProductModel_1.default.find({ is_deleted: false })).length;
        const totalPages = Math.ceil(totalItems / +pageSize);
        const skip = (+current - 1) * +pageSize;
        const searchRegex = new RegExp(`^${search}`, 'i');
        const handleFilter = yield (0, exports.checkFilterAction)(filterReq + "");
        let handleSearch = [];
        if (search.toString().length > 0) {
            handleSearch = [
                // { _id: new mongoose.Types.ObjectId(searchRegex + "") },
                { pro_name: searchRegex },
            ];
        }
        const result = yield ProductModel_1.default
            .find(Object.assign(Object.assign({}, handleFilter), { $or: handleSearch }))
            .limit(+pageSize)
            .skip(skip)
            .populate("cate_id", 'cate_name')
            .sort({ _id: -1 })
            .where({ is_deleted: false });
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
exports.handleFilterAndSearch = handleFilterAndSearch;
