import { Request, Response } from "express";
import { firebaseConfig } from "../../config/firebase";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { giveCurrentDateTime } from "../../service";

initializeApp(firebaseConfig);

const storage = getStorage()

export const uploadSingleFile = async (req: Request, res: Response) => {
    try {
        const dateTime = giveCurrentDateTime();
        if (!req.file) {
            return res.status(400).send("No file uploaded.")
        }
        const storageRef = ref(storage, `files/${req.file?.originalname + "       " + dateTime}`);

        const metaData = {
            contentType: req.file?.mimetype
        }

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metaData);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log("File successfully uploaded.");

        return res.status(200).json({
            message: "File uploaded to firebase storage",
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })

    } catch (error) {
        return res.status(400).send(error)
    }
}