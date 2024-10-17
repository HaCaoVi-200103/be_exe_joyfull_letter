import mongoose, { Schema } from "mongoose";
import { genSalt, hash } from "bcrypt"


const StaffSchema = new Schema({
    staff_fullName: { type: String, required: true },
    staff_email: { type: String, required: true },
    staff_password: { type: String, required: true },
    staff_phone: { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: null }
});

StaffSchema.pre("save", async function (next) {
    const salt = await genSalt();
    this.staff_password = await hash(this.staff_password, salt);
    next();
})

const Staff = mongoose.model("staffs", StaffSchema);

export default Staff;