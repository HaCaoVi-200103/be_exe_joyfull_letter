"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseConfig = void 0;
const ResponseConfig = (res, responseConfig) => {
    let config = {
        statusCode: responseConfig.statusCode,
    };
    if (responseConfig.message) {
        config = Object.assign(Object.assign({}, config), { message: responseConfig.message });
    }
    if (responseConfig.data) {
        config = Object.assign(Object.assign({}, config), { data: responseConfig.data });
    }
    switch (responseConfig.statusCode) {
        case 200:
            return res.status(responseConfig.statusCode).json(config);
        case 201:
            return res.status(responseConfig.statusCode).json(config);
        case 400:
            config = Object.assign(Object.assign({}, config), { error: "Bad Request" });
            return res.status(responseConfig.statusCode).json(config);
        case 401:
            config = Object.assign(Object.assign({}, config), { error: "Unauthorized" });
            return res.status(responseConfig.statusCode).json(config);
        case 403:
            config = Object.assign(Object.assign({}, config), { error: "Forbidden" });
            return res.status(responseConfig.statusCode).json(config);
        case 404:
            config = Object.assign(Object.assign({}, config), { error: "Not Found" });
            return res.status(responseConfig.statusCode).json(config);
        case 500:
            config = Object.assign(Object.assign({}, config), { error: "Internal Server Error" });
            return res.status(responseConfig.statusCode).json(config);
        default:
            return res.status(responseConfig.statusCode).json(config);
    }
};
exports.ResponseConfig = ResponseConfig;
