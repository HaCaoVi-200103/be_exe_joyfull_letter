import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  cate_id: { type: mongoose.Schema.Types.ObjectId, ref: "category" }, // Reference to Category
  pro_name: { type: String, required: true },
  pro_price: { type: Number, min: 0, required: true, default: 0 },
  pro_discount: { type: Number, required: true, default: 0 },
  pro_size: { type: [String], required: true },
  pro_picture: { type: String, required: true, default: "" },
  pro_description: { type: String, required: true, default: "" },
  is_deleted: { type: Boolean, required: true, default: false },
},
  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);

export default Product;
