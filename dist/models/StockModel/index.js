"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StockSchema = new mongoose_1.default.Schema({
    pro_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'products' }, // Reference to Product
    stock_import: { type: Number, min: 0 },
    stock_export: { type: Number, min: 0 }
}, { timestamps: true });
const Stock = mongoose_1.default.model("stocks", StockSchema);
exports.default = Stock;
