import mongoose, { Schema } from "mongoose";

const ManagerSeedSchema = new Schema({
    seed_id: { type: mongoose.Schema.Types.ObjectId, ref: 'seeds' },
    pro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }
});

const ManagerSeed = mongoose.model("managerSeed", ManagerSeedSchema)

export default ManagerSeed;