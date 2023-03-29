import express, { NextFunction, Request, Response, Express } from "express";
import sharp from "sharp";
import { promises as fsPromise } from "fs";
import path from "path";
import { getFile } from "./utilities/resize";

const app = express();
app.use(express.static("images"));

app.get("/api/images", async (req: Request, res: Response) => {
  const { fileName = "", width = 300, height = 300 } = req.query;
  if (fileName) {
    try {
      const bufferFile = await getFile(fileName.toString());
      sharp(bufferFile)
        .rotate()
        .resize(Number(width), Number(height))
        .jpeg({ mozjpeg: true })
        .toBuffer()
        .then(async (data) => {
          await fsPromise.writeFile(
            `images/resize-images/${req.query.fileName}`,
            data
          );
          res.sendFile(`images/resize-images/${req.query.fileName}`, {
            root: path.join(__dirname, "../"),
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: "error",
            message: err.message,
          });
        });
    } catch (error: any) {
      console.log("err", error);
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
