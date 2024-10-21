import mongoose, { Schema } from "mongoose";

const SeedSchema = new Schema({
    seed_name: { type: String, required: true },
    is_delete: { type: Boolean, default: false },
});

const Seed = mongoose.model("seeds", SeedSchema)

export default Seed;