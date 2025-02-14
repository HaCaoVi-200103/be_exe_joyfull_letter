"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const index_1 = __importDefault(require("./routes/index"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const cors_1 = __importDefault(require("cors"));
const response_1 = require("./config/response");
const app = (0, express_1.default)();
(0, mongodb_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN_FE_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type', 'X-Requested-With'],
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get('/', (req, res) => {
    return (0, response_1.ResponseConfig)(res, {
        statusCode: 200,
        data: {
            name: "Joyful Letter",
            author: "ICao"
        }
    });
});
(0, index_1.default)(app);
app.all("*", (req, res) => {
    return (0, response_1.ResponseConfig)(res, {
        statusCode: 404,
        message: "API endpoint not found"
    });
});
app.use((__, _, next) => {
    next((0, http_errors_1.default)(404));
});
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
exports.default = app;
