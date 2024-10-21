"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleProducts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.sampleProducts = [
    {
        cate_id: new mongoose_1.default.Types.ObjectId("6710c2be8038518ec5033546"), // Thay thế bằng ObjectId thực tế
        pro_name: "Handmade Birthday Card",
        pro_price: 5.99,
        pro_discount: 0,
        pro_size: "A6",
        pro_picture: "birthday_card.jpg",
        pro_description: "Beautiful handmade birthday card made from recycled paper with unique designs.",
        create_at: new Date(),
        update_at: null,
        is_delete: false
    },
    {
        cate_id: new mongoose_1.default.Types.ObjectId("6710c2be8038518ec5033546"),
        pro_name: "Thank You Greeting Card",
        pro_price: 4.99,
        pro_discount: 0.1,
        pro_size: "A5",
        pro_picture: "thank_you_card.jpg",
        pro_description: "Elegant thank you card with hand-painted floral art on recycled paper.",
        create_at: new Date(),
        update_at: null,
        is_delete: false
    },
    {
        cate_id: new mongoose_1.default.Types.ObjectId("6710c2be8038518ec5033546"),
        pro_name: "Wedding Invitation Card",
        pro_price: 7.99,
        pro_discount: 0.15,
        pro_size: "A5",
        pro_picture: "wedding_invitation.jpg",
        pro_description: "Luxurious wedding invitation card crafted with lace and handmade paper.",
        create_at: new Date(),
        update_at: null,
        is_delete: false
    },
    {
        cate_id: new mongoose_1.default.Types.ObjectId("6710c2be8038518ec5033546"),
        pro_name: "Christmas Card",
        pro_price: 6.50,
        pro_discount: 0.05,
        pro_size: "A6",
        pro_picture: "christmas_card.jpg",
        pro_description: "Festive Christmas card with eco-friendly materials and a personalized message option.",
        create_at: new Date(),
        update_at: null,
        is_delete: false
    }
];
