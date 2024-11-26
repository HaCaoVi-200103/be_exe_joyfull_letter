import multer, { FileFilterCallback } from "multer";
import express, { Express, Request } from "express";
import {
  uploadMutipleFile,
  uploadSingleFile,
} from "../controllers/uploadFileController";
import verifyToken from "../middleware";

const route = express.Router();

const imagerFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    // req.filevalidationError = "Only image files are allowed!"
    return callback(null, false);
  }
  callback(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, callback) => imagerFilter(req, file, callback),
});

const uploadApiRoutes = () => {
  route.post(
    "/upload-single-file",
    verifyToken,
    upload.single("fileName"),
    uploadSingleFile
  );
  route.post(
    "/upload-multiple-file",
    verifyToken,
    upload.array("fileList", 6),
    uploadMutipleFile
  );

  return route;
};

export default uploadApiRoutes;
