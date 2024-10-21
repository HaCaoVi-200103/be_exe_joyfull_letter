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
const config_1 = __importDefault(require("./config"));
const ProductRoute_1 = __importDefault(require("./routes/ProductRoute"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const app = (0, express_1.default)();
(0, config_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
(0, index_1.default)(app);
(0, ProductRoute_1.default)(app);
(0, Auth_1.default)(app);
app.all("*", (req, res) => {
    return res.status(200).send("API endpoint not found");
});
app.use((__, _, next) => {
    next((0, http_errors_1.default)(404));
});
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
