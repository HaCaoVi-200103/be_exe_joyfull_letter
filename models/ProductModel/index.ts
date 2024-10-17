import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    cate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'categorys' }, // Reference to Category
    pro_name: { type: String, required: true },
    pro_price: { type: Number, min: 0, required: true },
    pro_discount: { type: Number, required: true },
    pro_size: { type: String, required: true },
    pro_picture: { type: String, required: true },
    pro_description: { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: null },
    is_delete: { type: Boolean, default: false }
});

const Product = mongoose.model("products", ProductSchema);

export default Product;