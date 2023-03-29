"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resize_1 = require("../utilities/resize");
describe("test load file", () => {
    it("should contain file in the server", () => {
        expect(Number((0, resize_1.getFile)("encenadaport1.jpg"))).toBeNaN();
    });
});
