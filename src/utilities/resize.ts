import { promises as fsPromise } from "fs";

const getFile = (fileName: string) => {
  return fsPromise.readFile(`./images/${fileName}`);
};

export {getFile}
