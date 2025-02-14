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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleFile = exports.uploadSingleFile = void 0;
const firebase_1 = require("../config/firebase");
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const service_1 = require("../service");
const response_1 = require("../config/response");
(0, app_1.initializeApp)(firebase_1.firebaseConfig);
const storage = (0, storage_1.getStorage)();
const uploadSingleFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const dateTime = (0, service_1.giveCurrentDateTime)();
        if (!req.file) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `No file uploaded.(File must be jpg, jpeg, png)`,
            });
        }
        const storageRef = (0, storage_1.ref)(storage, `files/${((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname) + "       " + dateTime}`);
        const metaData = {
            contentType: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
        };
        const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, req.file.buffer, metaData);
        const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            message: `File uploaded to firebase storage`,
            data: {
                name: req.file.originalname,
                type: req.file.mimetype,
                downloadURL: downloadURL,
            }
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 400,
            message: `Upload fails!`,
        });
    }
});
exports.uploadSingleFile = uploadSingleFile;
const uploadMultipleFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dateTime = (0, service_1.giveCurrentDateTime)();
        const files = req.files;
        if (!files || files.length === 0) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: `No file uploaded.(File must be jpg, jpeg, png)`,
            });
        }
        const downloadURLs = [];
        for (const file of files) {
            const storageRef = (0, storage_1.ref)(storage, `files/${file.originalname + "        " + dateTime}`);
            const metaData = {
                contentType: file.mimetype,
            };
            const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, file.buffer, metaData);
            const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
            downloadURLs.push(downloadURL);
        }
        console.log("downloadURLs: ", downloadURLs);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            message: `File uploaded to firebase storage`,
            data: downloadURLs
        });
    }
    catch (error) {
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 400,
            message: `Upload fails!`,
        });
    }
});
exports.uploadMultipleFile = uploadMultipleFile;
