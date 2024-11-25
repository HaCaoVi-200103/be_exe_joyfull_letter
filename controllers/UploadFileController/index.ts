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
            return res.status(400).send("No file uploaded.(File must be jpg, jpeg, png, gif)")
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
        return res.status(400).send("Upload fails!!")
    }
}

export const uploadMutipleFile = async (req: Request, res: Response) => {
    try {
        const dateTime = giveCurrentDateTime()
        const files = req.files as Express.Multer.File[];
        if (!files || files.length === 0) {
            return res.status(400).send("No file uploaded.(File must be jpg, jpeg, png, gif)")
        }

        const downloadURLs: string[] = []

        for (const file of files) {
            const storageRef = ref(storage, `files/${file.originalname + "        " + dateTime}`);

            const metaData = {
                contentType: file.mimetype
            }

            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metaData)
            const downloadURL = await getDownloadURL(snapshot.ref)
            downloadURLs.push(downloadURL)
        }

        console.log("downloadURLs: ", downloadURLs);

        return res.status(200).json({
            message: "File uploaded to firebase storage",
            downloadURL: downloadURLs
        })

    } catch (error) {
        return res.status(400).send("Upload fails!!")
    }
}