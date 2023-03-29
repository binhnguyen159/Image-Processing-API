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
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const resize_1 = require("./utilities/resize");
const app = (0, express_1.default)();
app.use(express_1.default.static("images"));
app.get("/api/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName = "", width = 300, height = 300 } = req.query;
    if (fileName) {
        try {
            const bufferFile = yield (0, resize_1.getFile)(fileName.toString());
            console.log("number", Number(bufferFile));
            (0, sharp_1.default)(bufferFile)
                .rotate()
                .resize(Number(width), Number(height))
                .jpeg({ mozjpeg: true })
                .toBuffer()
                .then((data) => __awaiter(void 0, void 0, void 0, function* () {
                yield fs_1.promises.writeFile(`images/resize-images/${req.query.fileName}`, data);
                res.sendFile(`images/resize-images/${req.query.fileName}`, {
                    root: path_1.default.join(__dirname, "../"),
                });
            }))
                .catch((err) => {
                res.status(400).json({
                    status: "error",
                    message: err.message,
                });
            });
        }
        catch (error) {
            console.log("err", error);
            res.status(400).json({
                status: "error",
                message: error.message,
            });
        }
    }
}));
app.listen(3000, () => {
    console.log("App is running on port 3000");
});
