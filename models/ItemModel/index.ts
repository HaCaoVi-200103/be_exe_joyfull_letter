import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
    orD_id: { type: mongoose.Schema.Types.ObjectId, ref: 'orderdetais' }, // Reference to OrderDetails
    order_QR: { type: String, required: true },
    order_content: { type: String, required: true }
});


const Item = mongoose.model("items", ItemSchema)

export default Item;