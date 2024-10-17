import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    cate_name: { type: String, required: true }
});

const Category = mongoose.model("categorys", CategorySchema);

export default Category;