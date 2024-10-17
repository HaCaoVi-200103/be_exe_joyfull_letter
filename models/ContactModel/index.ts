import mongoose, { Schema } from "mongoose";

const ContactSchema = new Schema({
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'staffs', required: true, },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, default: "" },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: null },
    status: { type: Boolean, default: false }
});


const Contact = mongoose.model("contacts", ContactSchema);

export default Contact;