const request = require("supertest");
const app = require("./app")

describe("GET/", () => {
  test("respond with id", async () => {
    const responds = await request(movie).get("/movie/:movieId");
    expect(responds.status).toBe(200);
  });
});
