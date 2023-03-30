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
const resize_1 = require("../utilities/resize");
const supertest_1 = __importDefault(require("supertest"));
const api_1 = __importDefault(require("./../routes/api"));
const index_1 = __importDefault(require("./../index"));
const request = (0, supertest_1.default)(index_1.default);
const request2 = (0, supertest_1.default)(api_1.default);
describe("test load file", () => {
    it("should contain file in the server", (done) => {
        expect(Number((0, resize_1.getFile)("encenadaport.jpg"))).toBeNaN();
        done();
    });
});
describe("test resize file", () => {
    it("should resize file in the server", () => __awaiter(void 0, void 0, void 0, function* () {
        const bufferFile = yield (0, resize_1.getFile)("encenadaport.jpg");
        const resize = yield (0, resize_1.resizeFile)(bufferFile, 300, 300, "encenadaport.jpg");
        expect(resize.code).toEqual(200);
    }));
});
describe("test endpoint", () => {
    it("should reize and response file in the server", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?fileName=encenadaport.jpg&width=500&height=500");
        // .then((res: any) => {
        //   expect(res.res.socket._httpMessage.res.statusCode).toBe(200);
        //   done();
        // });
        console.log(response.res.socket._httpMessage.res.statusCode);
        expect(response.res.socket._httpMessage.res.statusCode).toBe(200);
        // const { res }: any = await request.get("/api/images2");
        // console.log("{ response }", res.socket._httpMessage.res.statusCode);
        // expect(res.socket._httpMessage.res.statusCode).toBe(200);
        // // done();
    }));
});
