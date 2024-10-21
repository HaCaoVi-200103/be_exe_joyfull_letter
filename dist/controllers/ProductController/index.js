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
exports.deleteProductById = exports.updateProductById = exports.createProduct = exports.getProductID = exports.getListProduct = void 0;
const ProductModel_1 = __importDefault(require("../../models/ProductModel"));
const service_1 = require("../../service");
const getListProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ProductModel_1.default.find().where({ is_delete: false });
        if (!result) {
            return res.status(400).send("No Data");
        }
        return res.status(200).json({ data: result });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});
exports.getListProduct = getListProduct;
const getProductID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proId = req.params.proId;
        if (!proId) {
            return res.status(400).json({ message: "Missing required parameter: proId" });
        }
        const checkProId = yield (0, service_1.checkProductById)(req, res, proId);
        if (!checkProId) {
            return res.status(404).json({ message: `No data with pro id with ${proId}` });
        }
        const result = yield ProductModel_1.default.findOne({ _id: proId }).where({ is_delete: false });
        if (!result) {
            return res.status(404).json({ message: "Data Not found", data: null });
        }
        return res.status(200).json({ data: result });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Data Not found", data: null });
    }
});
exports.getProductID = getProductID;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cate_id, pro_name, pro_price, pro_discount, pro_size, pro_picture, pro_description } = req.body;
        if (!cate_id || !pro_name || !pro_price || pro_discount === null || !pro_size || !pro_picture || !pro_description) {
            return res.status(400).send("Missing required fields");
        }
        if (pro_discount > 1) {
            return res.status(400).send("Discount must be greather or equal 0 and lesster or equal 1");
        }
        const checkCateId = yield (0, service_1.checkCateById)(req, res, cate_id);
        if (!checkCateId) {
            return res.status(404).json({ message: `No data with cate id with ${cate_id}` });
        }
        const result = yield ProductModel_1.default.create({ cate_id, pro_name, pro_price, pro_discount, pro_size, pro_picture, pro_description });
        console.log(result);
        return res.status(201).send("Create successfull");
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});
exports.createProduct = createProduct;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proId = req.params.proId;
        if (!proId) {
            return res.status(400).json({ message: "Missing required parameter: proId" });
        }
        const checkProId = yield (0, service_1.checkProductById)(req, res, proId);
        if (!checkProId) {
            return res.status(404).json({ message: `No data with pro id with ${proId}` });
        }
        const { cate_id, pro_name, pro_price, pro_discount, pro_size, pro_picture, pro_description, is_delete } = req.body;
        if (!cate_id || !pro_name || !pro_price || pro_discount === null || !pro_size || !pro_picture || !pro_description || is_delete === undefined) {
            return res.status(400).send("Missing required fields");
        }
        if (pro_discount > 1) {
            return res.status(400).send("Discount must be greather or equal 0 and lesster or equal 1");
        }
        const checkCateId = yield (0, service_1.checkCateById)(req, res, cate_id);
        if (!checkCateId) {
            return res.status(404).json({ message: `No data with cate id with ${cate_id}` });
        }
        const result = yield ProductModel_1.default.findByIdAndUpdate(proId, { cate_id: cate_id, pro_name: pro_name, pro_price: pro_price, pro_discount: pro_discount, pro_size: pro_size, pro_picture: pro_picture, pro_description: pro_description, update_at: new Date(), is_delete: is_delete }, { new: true });
        if (!result) {
            return res.status(200).json({ message: "Update fails" });
        }
        return res.status(200).json({ message: "Update Successfull", data: result });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});
exports.updateProductById = updateProductById;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proId = req.params.proId;
        if (!proId) {
            return res.status(400).json({ message: "Missing required parameter proId" });
        }
        const checkProId = yield (0, service_1.checkProductById)(req, res, proId);
        if (!checkProId) {
            return res.status(404).json({ message: `No data with pro id with ${proId}` });
        }
        const result = yield ProductModel_1.default.findByIdAndUpdate(proId, { is_delete: true });
        res.status(200).json({ message: "Delete Successfull", data: result });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});
exports.deleteProductById = deleteProductById;
