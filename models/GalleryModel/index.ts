import mongoose, { Schema } from "mongoose";

const GallerySchema = new Schema({
    pro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }, // Reference to Product
    gal_picture: { type: String, required: true }
});

const Gallery = mongoose.model("gallerys", GallerySchema)

export default Gallery;