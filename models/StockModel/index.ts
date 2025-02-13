import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    pro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }, // Reference to Product
    stock_import: { type: Number, min: 0 },
    stock_export: { type: Number, min: 0 }
}, { timestamps: true });


const Stock = mongoose.model("stocks", StockSchema)

export default Stock;