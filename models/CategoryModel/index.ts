import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    cate_name: { type: String, required: true },
    is_deleted: { type: Boolean, default: false }
},
    { timestamps: true }
);

const Category = mongoose.model("category", CategorySchema);

export default Category;