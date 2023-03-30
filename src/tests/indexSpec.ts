import { getFile, resizeFile } from "../utilities/resize";
import supertest from "supertest";

import api from "./../routes/api";
import app from "./../index";

const request = supertest(app);
const request2 = supertest(api);

describe("test load file", () => {
  it("should contain file in the server", (done) => {
    expect(Number(getFile("encenadaport.jpg"))).toBeNaN();
    done();
  });
});

describe("test resize file", () => {
  it("should resize file in the server", async () => {
    const bufferFile = await getFile("encenadaport.jpg");
    const resize = await resizeFile(bufferFile, 300, 300, "encenadaport.jpg");
    expect(resize.code).toEqual(200);
  });
});

describe("test endpoint", () => {
  it("should reize and response file in the server", async () => {
    const response: any = await request.get(
      "/api/images?fileName=encenadaport.jpg&width=500&height=500"
    );
    expect(response.res.socket._httpMessage.res.statusCode).toBe(200);
  });
});
