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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ProductSchema = new mongoose_1.Schema({
    cate_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "categorys" }, // Reference to Category
    pro_name: { type: String, required: true },
    pro_price: { type: Number, min: 0, required: true },
    pro_discount: { type: Number, required: true, max: 1, min: 0 },
    pro_size: { type: String, required: true },
    pro_picture: { type: String, required: true },
    pro_description: { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: null },
    is_delete: { type: Boolean, default: false },
});
const Product = mongoose_1.default.model("products", ProductSchema);
exports.default = Product;
