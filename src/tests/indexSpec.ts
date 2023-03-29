import { getFile } from "../utilities/resize";

describe("test load file", () => {
  it("should contain file in the server", () => {
    expect(Number(getFile("encenadaport.jpg"))).toBeNaN();
  });
});
