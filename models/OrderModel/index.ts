import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'staffs' }, // Reference to Staff
    order_fullname: { type: String, required: true },
    order_phone: { type: String, required: true },
    order_address: { type: String, required: true },
    order_total: { type: Number, min: 0 },
    order_note: { type: String },
    order_status: { type: Boolean, default: false },
    payment_status: { type: Boolean, default: false },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: null }
});

const Order = mongoose.model("orders", OrderSchema)

export default Order;


