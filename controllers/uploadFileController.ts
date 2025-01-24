import { Request, Response } from "express";
import { firebaseConfig } from "../config/firebase";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { giveCurrentDateTime } from "../service";
import { ResponseConfig } from "../config/response";

initializeApp(firebaseConfig);

const storage = getStorage();

export const uploadSingleFile = async (req: Request, res: Response) => {
  try {
    const dateTime = giveCurrentDateTime();
    if (!req.file) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `No file uploaded.(File must be jpg, jpeg, png)`,
      });
    }

    const storageRef = ref(
      storage,
      `files/${req.file?.originalname + "       " + dateTime}`
    );

    const metaData = {
      contentType: req.file?.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metaData
    );

    const downloadURL = await getDownloadURL(snapshot.ref);

    return ResponseConfig(res, {
      statusCode: 200,
      message: `File uploaded to firebase storage`,
      data: {
        name: req.file.originalname,
        type: req.file.mimetype,
        downloadURL: downloadURL,
      }
    });
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 400,
      message: `Upload fails!`,
    });
  }
};

export const uploadMutipleFile = async (req: Request, res: Response) => {
  try {
    const dateTime = giveCurrentDateTime();
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `No file uploaded.(File must be jpg, jpeg, png)`,
      });
    }

    const downloadURLs: string[] = [];

    for (const file of files) {
      const storageRef = ref(
        storage,
        `files/${file.originalname + "        " + dateTime}`
      );

      const metaData = {
        contentType: file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metaData
      );
      const downloadURL = await getDownloadURL(snapshot.ref);
      downloadURLs.push(downloadURL);
    }

    console.log("downloadURLs: ", downloadURLs);

    return ResponseConfig(res, {
      statusCode: 200,
      message: `File uploaded to firebase storage`,
      data: downloadURLs
    });
  } catch (error) {
    return ResponseConfig(res, {
      statusCode: 400,
      message: `Upload fails!`,
    });
  }
};
