"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = void 0;
const fs_1 = require("fs");
const getFile = (fileName) => {
    return fs_1.promises.readFile(`./images/${fileName}`);
};
exports.getFile = getFile;
