import multer from "multer"
import express, { Express } from "express";
import { uploadSingleFile } from "../../controllers/UploadFileController";

const route = express.Router();

const upload = multer({ storage: multer.memoryStorage() })

const uploadApiRoutes = (app: Express) => {
    route.post("/upload-single-file", upload.single("filename"), uploadSingleFile)

    return app.use('/api/v1', route);
}

export default uploadApiRoutes;
