import cors from "cors";
import path from "path";
import express from "express";
import PdfParse from "pdf-parse";
import { readFileSync } from "fs";
import LanguageDetect from "languagedetect";
import multer, { diskStorage } from "multer";
import { randomUUID } from "crypto";

const tmpPath = path.join(__dirname, "..", "tmp");
const filesPath = path.join(tmpPath, "files");
const audiosPath = path.join(tmpPath, "audio");

const storageFiles = diskStorage({
  destination: (_, __, callback) => {
    callback(null, filesPath);
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const storageAudios = diskStorage({
  destination: (_, __, callback) => {
    callback(null, audiosPath);
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploadFiles = multer({ storage: storageFiles });
const uploadAudios = multer({ storage: storageAudios });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static(audiosPath));

app.post("/files", uploadFiles.single("file"), async (request, response) => {
  const { file } = request;

  if (!file) return;

  const buffer = readFileSync(`${filesPath}/${file.originalname}`);
  const content = (await PdfParse(buffer)).text;

  const regex1 = /.*?Texto linha a linha \(sem notes\)/s;
  const regex2 = /Texto linha a linha \(com notes\)[\s\S]*/s;

  const filteredContent = content
    .replace(regex1, "")
    .replace(regex2, "")
    .trim();

  const lines = filteredContent.split("\n");

  const lngDetector = new LanguageDetect();

  const notes: { uuid: string; front: string; back: string }[] = [];
  lines.forEach((line, index) => {
    const [firstDetectedLanguage] = lngDetector.detect(line, 1);
    const [secondDetectedLanguage] = lngDetector.detect(lines[index + 1], 1);

    if (line.match(/cimv/i) || line.match(/curso de inglês mairo vergara/i))
      return;

    if (
      firstDetectedLanguage?.[0] === "english" &&
      ["portuguese", "spanish"].includes(secondDetectedLanguage?.[0])
    ) {
      notes.push({ uuid: randomUUID(), front: line, back: lines[index + 1] });
    }
  });

  response.json(notes);
});

app.post("/audios", uploadAudios.array("files"), (request, response) => {
  const { files } = request;

  if (!files?.length) return;

  const data = Object.values(files).map((file) => ({
    name: file.originalname,
  }));

  response.json(data);
});

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT || 3333,
});
