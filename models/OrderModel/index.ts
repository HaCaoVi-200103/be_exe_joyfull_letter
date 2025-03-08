import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    total_price: { type: Number, default: 0 },
    pay_status: { type: Boolean, default: false },
    order_status: { type: Boolean, default: false },
},
    { timestamps: true }
);

const Order = mongoose.model("order", OrderSchema);

export default Order;
