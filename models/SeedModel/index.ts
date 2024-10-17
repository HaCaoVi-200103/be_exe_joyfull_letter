import mongoose, { Schema } from "mongoose";

const SeedSchema = new Schema({
    seed_name: { type: String, required: true }
});

const Seed = mongoose.model("seeds", SeedSchema)

export default Seed;