import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
    title: { type: String, required: true },
    images: { type: [String], min: 0, required: true, default: 0 },
    description: { type: String, required: true },
},
    { timestamps: true }
);

const Blog = mongoose.model("blog", BlogSchema);

export default Blog;
