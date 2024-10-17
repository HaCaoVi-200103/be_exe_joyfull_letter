import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'staffs' }, // Reference to Staff
    pro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }, // Reference to Product
    stock_import: { type: Number, min: 0 },
    stock_export: { type: Number, min: 0 }
});


const Stock = mongoose.model("stocks", StockSchema)

export default Stock;