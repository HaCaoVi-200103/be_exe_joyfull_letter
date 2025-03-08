import mongoose, { Schema } from "mongoose";

const OrderDetailSchema = new Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
    pro_id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    quantity: { type: Number, min: 0, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
},
    { timestamps: true }
);

const OrderDetail = mongoose.model("orderdetails", OrderDetailSchema);

export default OrderDetail;
