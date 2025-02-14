"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSeed = exports.updateSeed = exports.createSeed = exports.getSeedById = exports.getAllSeed = void 0;
const SeedModel_1 = __importDefault(require("../models/SeedModel"));
const service_1 = require("../service");
const response_1 = require("../config/response");
const getAllSeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield SeedModel_1.default.find();
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            data: result
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.getAllSeed = getAllSeed;
const getSeedById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seedId = req.params.seedId;
        if (!seedId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Missing required parameter: ${seedId}`
            });
        }
        const checkSeedId = yield (0, service_1.checkSeedById)(seedId);
        if (!checkSeedId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not found category with id: ${seedId}`
            });
        }
        const result = yield SeedModel_1.default.findById(seedId);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            data: result
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.getSeedById = getSeedById;
const createSeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Missing required fields"
            });
        }
        yield SeedModel_1.default.create({ seed_name: name, is_deleted: false });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            message: `Created Successfully`
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.createSeed = createSeed;
const updateSeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seedId = req.params.seedId;
        if (!seedId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Missing required parameter seed id!`,
            });
        }
        const checkSeedId = yield (0, service_1.checkSeedById)(seedId);
        if (!checkSeedId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not found seed with id: ${seedId}`,
            });
        }
        const { name } = req.body;
        if (!name) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Missing required fields"
            });
        }
        yield SeedModel_1.default.findByIdAndUpdate(seedId, { seed_name: name });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            message: `Updated Successfully`
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.updateSeed = updateSeed;
const deleteSeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seedId = req.params.seedId;
        if (!seedId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `Missing required parameter seed id!`,
            });
        }
        const checkSeedId = yield (0, service_1.checkSeedById)(seedId);
        if (!checkSeedId) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: `Not found seed with id: ${seedId}`,
            });
        }
        yield SeedModel_1.default.findByIdAndUpdate(seedId, { is_deleted: true });
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            message: `Deleted Successfully`
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.deleteSeed = deleteSeed;
