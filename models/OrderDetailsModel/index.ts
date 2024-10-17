import mongoose, { Schema } from "mongoose";

const OrderDetailsSchema = new Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'orders' }, // Reference to Order
    pro_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }, // Reference to Product
    orD_quantity: { type: Number, required: true, min: 0 },
    orD_price: { type: Number, required: true, min: 0 },
    orD_seed: { type: String, required: true },
    orD_size: { type: String }
});


const OrderDetail = mongoose.model("orderdetais", OrderDetailsSchema)

export default OrderDetail;